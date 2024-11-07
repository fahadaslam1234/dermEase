import { AfterViewInit, Component, OnInit } from '@angular/core';
import { QuickViewProductComponent } from '../quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/productModel';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../services/overlay.service';
import { ProductService } from '../../services/productService'; // Import ProductService

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  cartVisible = false;
  cartItems: any[] = [];
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12]; // Custom page size options
  pageEvent!: PageEvent;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private router: Router,
    private overlayService: OverlayService,
    private productService: ProductService  // Inject ProductService
  ) {}

  ngOnInit() {
    this.fetchProducts(); // Fetch products from the backend
    this.subscribeToCartUpdates();
  }

  ngAfterViewInit(): void {}

  // Fetch products from backend
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.updatePaginatedProducts(0, this.pageSize); // Set paginated products after fetching
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
      width: '100%',
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
    this.router.navigate(['/checkout']);
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
}
