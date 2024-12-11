import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { QuickViewProductComponent } from 'src/app/layout/quickViewProduct/quickViewProduct.component';
import { Product } from 'src/app/models/productModel';
import { CartService } from 'src/app/services/cart.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { ProductService } from 'src/app/services/productService';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product; // Use a single product, not an array
  reviews: { username: string; email: string; comments: string }[] = [];
  reviewForm = { username: '', email: '', comments: '' };
  cartVisible = false;
  cartItems: any[] = [];
  products: Product[] = [];
  quantity: number = 1; // Default quantity

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cartService: CartService,
    private productService: ProductService,  // Inject ProductService
    private router: Router,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(productId);
      this.submitReview();
      this.getProductReviews(productId);
    }
  }

  loadProductDetails(productId: string): void {
    this.productService.getProductDetails(productId).subscribe({
      next: (response:any) => {
        if (response.status && response.data) {
          this.product = response.data; // Extract and assign the product details
          console.log(this.product);
          console.log('productName', this.product.product_name);
          console.log('productDescription', this.product.product_description);
        } else {
          console.error('Product not found or invalid response:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
      },
    });
  }


  getProductReviews(productId: string): void {
    // Replace with an actual API call
    this.reviews = [
      { username: 'John Doe', email: 'john@example.com', comments: 'Great product!' },
      { username: 'Jane Smith', email: 'jane@example.com', comments: 'Highly recommend it!' },
    ];
  }

  submitReview(): void {
    if (
      this.reviewForm.username &&
      this.reviewForm.email &&
      this.reviewForm.comments
    ) {
      // Replace with an actual API call to save the review
      this.reviews.push({ ...this.reviewForm });
      this.reviewForm = { username: '', email: '', comments: '' }; // Reset form
    }
  }



  validateQuantity(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxQuantity = 5;

    if (+inputElement.value > maxQuantity) {
      inputElement.value = maxQuantity.toString();
    }
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
