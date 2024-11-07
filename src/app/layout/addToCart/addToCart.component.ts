import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../models/productModel';
import { ProductService } from '../../services/productService'; // Import ProductService
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-addToCart',
  templateUrl: './addToCart.component.html',
  styleUrls: ['./addToCart.component.css']
})
export class AddToCartComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  cartItems: any[] = [];
  cartVisible = false;
  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12]; // Custom page size options
  pageEvent!: PageEvent;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService,  // Inject ProductService
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchProducts(); // Fetch products from the backend
    this.subscribeToCartUpdates();
  }

  // Fetch products from the backend
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.updatePaginatedProducts(0, this.pageSize); // Initialize paginated products after fetching
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  updatePaginatedProducts(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.updatePaginatedProducts(event.pageIndex, event.pageSize);
  }

  subscribeToCartUpdates() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.cartVisible = items.length > 0; // Automatically show cart when items are added
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartVisible = true; // Show the cart sidebar when an item is added
    this.subscribeToCartUpdates();
  }

  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }

  checkout() {
    this.router.navigate(['/checkOut']);
    this.cartVisible = false;
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    if (this.products.length === 0) {
      this.cartVisible = false; // Hide cart sidebar if no items are left
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  onViewCart() {
    this.router.navigate(['/viewCart']);
    this.cartVisible = false;
  }

  removeItemFromCart(product: Product) {
    this.cartService.removeItemCompletely(product);
    if (this.cartItems.length === 0) {
      this.cartVisible = false; // Hide cart sidebar if no items are left
    }
  }
}
