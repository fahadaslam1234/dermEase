import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private itemsInCart: Product[] = [];

  constructor() {
    this.loadCart();
    this.itemsInCartSubject.subscribe(_ => {
      this.itemsInCart = _;
      this.saveCart();
    });
  }

  public addToCart(item: Product) {
    // Check if the product already exists in the cart
    let existingItem = this.itemsInCart.find(product => product.product_name === item.product_name);

    if (existingItem) {
      // Update the quantity of the existing product
      existingItem.quantity = (existingItem.quantity ?? 0) + (item.quantity ?? 1);
    } else {
      // Add the product with the specified quantity (default to 1 if not provided)
      item.quantity = item.quantity ?? 1;
      this.itemsInCart.push(item);
    }

    // Notify subscribers about the updated cart
    this.itemsInCartSubject.next(this.itemsInCart);
  }

  public removeFromCart(item: Product) {
    const index = this.itemsInCart.findIndex(product => product.product_name === item.product_name);
    if (index !== -1) {
      const product = this.itemsInCart[index];
      if (product.quantity && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        this.itemsInCart.splice(index, 1);
      }
      this.itemsInCartSubject.next(this.itemsInCart);
    }
  }

  public removeItemCompletely(item: Product) {
    const index = this.itemsInCart.findIndex(product => product.product_name === item.product_name);
    if (index !== -1) {
      this.itemsInCart.splice(index, 1);
      this.itemsInCartSubject.next(this.itemsInCart);
    }
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getCartCount(): number {
    return this.itemsInCart.reduce((total, item) => total + (item.quantity ?? 0), 0);
  }

  private saveCart(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.itemsInCart));
    }
  }

  private loadCart(): void {
    if (typeof localStorage !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      this.itemsInCart = savedCart ? JSON.parse(savedCart) : [];
      this.itemsInCartSubject.next(this.itemsInCart);
    } else {
      this.itemsInCart = [];
      this.itemsInCartSubject.next(this.itemsInCart);
    }
  }

  // New method to sync cart with available products
  public syncCartWithProducts(productArray: Product[]): void {
    this.itemsInCart = this.itemsInCart.filter(cartItem =>
      productArray.some(product => product.product_name === cartItem.product_name)
    );
    this.itemsInCartSubject.next(this.itemsInCart);
    this.saveCart(); // Save updated cart to localStorage
  }
}
