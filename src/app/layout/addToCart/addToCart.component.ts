import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../models/productModel';
import { ProductService } from '../../services/productService';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-add-to-cart',
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
  isLoading = false; // Loading state

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.subscribeToCartUpdates();
  }

  // Fetch products from the backend
  fetchProducts(): void {
    this.isLoading = true; // Show loading spinner
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.data || [];
        this.updatePaginatedProducts(0, this.pageSize); // Initialize paginated products
        this.isLoading = false; // Hide loading spinner
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false; // Hide loading spinner on error
      }
    });
  }

  // Update paginated products
  updatePaginatedProducts(pageIndex: number, pageSize: number): void {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  // Handle pagination events
  handlePageEvent(event: PageEvent): void {
    this.updatePaginatedProducts(event.pageIndex, event.pageSize);
  }

  // Subscribe to cart updates
  subscribeToCartUpdates(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems);
      this.cartVisible = items.length > 0; // Automatically show cart if there are items
    });
  }

  // Add item to cart
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.cartVisible = true; // Show the cart sidebar when an item is added
  }

  // Toggle cart visibility
  toggleCart(): void {
    this.cartVisible = !this.cartVisible;
  }

  // Get the total number of items in the cart
  getCartCount(): number {
    return this.cartService.getCartCount();
  }

  // Checkout
  checkout(): void {
    this.router.navigate(['/checkOut']);
    this.cartVisible = false;
  }

  // Remove one unit of the product from the cart
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cartVisible = this.cartItems.length > 0; // Hide cart sidebar if no items are left
  }

  // Calculate the total price
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Navigate to view cart page
  onViewCart(): void {
    this.router.navigate(['/viewCart']);
    this.cartVisible = false;
  }

  // Remove an item completely from the cart
  removeItemFromCart(product: Product): void {
    this.cartService.removeItemCompletely(product);
    this.cartVisible = this.cartItems.length > 0; // Hide cart sidebar if no items are left
  }
}
