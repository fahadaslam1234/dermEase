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
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }
  public addToCart(item: Product) {
    let existingItem = this.itemsInCart.find(product => product.name === item.name);
    if (existingItem) {
      // Ensure quantity is initialized before incrementing
      existingItem.quantity = (existingItem.quantity ?? 0) + 1; // Use nullish coalescing to default to 0 if undefined
    } else {
      item.quantity = 1; // Initialize quantity for new items
      this.itemsInCart.push(item);
    }
    this.itemsInCartSubject.next(this.itemsInCart);
  }

  public removeFromCart(item: Product) {
    const index = this.itemsInCart.findIndex(product => product.name === item.name);
    if (index !== -1) {
      // Decrement the quantity or remove the item if quantity falls below 1
      const product = this.itemsInCart[index];
      if (product.quantity && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        this.itemsInCart.splice(index, 1);
      }
      this.itemsInCartSubject.next(this.itemsInCart);
    }
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getCartCount(): number {
    // Sum up all quantities in the cart to get the total count
    return this.itemsInCart.reduce((total, item) => total + (item.quantity ?? 0), 0);
  }
}
