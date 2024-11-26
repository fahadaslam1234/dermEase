import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../models/productModel';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/productService'; // Import ProductService
import { Router } from '@angular/router';
import { OverlayService } from '../../services/overlay.service';
import { QuickViewProductComponent } from 'src/app/layout/quickViewProduct/quickViewProduct.component';

@Component({
  selector: 'app-allProducts',
  templateUrl: './allProducts.component.html',
  styleUrls: ['./allProducts.component.css']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];  // Now empty, will be fetched from backend
  cartVisible = false;
  cartItems: any[] = [];
  paginatedProducts: Product[] = [];
  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12]; // Custom page size options
  pageEvent!: PageEvent;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService,  // Inject ProductService
    private router: Router,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.fetchAllProducts(); // Fetch all products when the component is initialized
    this.subscribeToCartUpdates();
    setTimeout(() => {
      this.cartService.syncCartWithProducts(this.products);
    }, 2000);
  }

  // Fetch all products from the backend using ProductService
  fetchAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.data;
        this.updatePaginatedProducts(0, this.pageSize); // Initialize pagination
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

  quickView(product: Product) {
    const dialogRef = this.dialog.open(QuickViewProductComponent, {
      width: '80%',
      maxWidth: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartVisible = true; // Show the cart sidebar when an item is added

    this.subscribeToCartUpdates();
    this.overlayService.openCart();
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
    if (this.cartItems.length === 0) {
      this.cartVisible = false; // Hide cart sidebar if no items are left
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  onViewCart() {
    this.router.navigate(['/viewCart']);
  }
}
