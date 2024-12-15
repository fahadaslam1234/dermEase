import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/productModel';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/productService'; // Import ProductService

@Component({
  selector: 'app-checkOutDetails',
  templateUrl: './checkOutDetails.component.html',
  styleUrls: ['./checkOutDetails.component.css']
})
export class CheckOutDetailsComponent implements OnInit {
  products: Product[] = [];
  countries = ['Pakistan', 'Canada', 'UK', 'Australia', 'India'];
  selectedShippingMethod: string = 'cod'; // Default shipping method

  constructor(
    private cartService: CartService,
    private productService: ProductService  // Inject ProductService
  ) {}

  ngOnInit(): void {
    this.fetchCartProducts(); // Fetch products from cart

    // Optionally, you can also fetch all products from the backend:
    // this.fetchAllProducts();
  }

  // Fetch products in the user's cart
  fetchCartProducts(): void {
    this.cartService.getItems().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  // Fetch all available products from the backend (if needed)
  fetchAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  calculateTotalOfItem(product: Product): number {
    return product.price * (product.quantity || 1);
  }

  calculateSubtotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  calculateTotal(): number {
    // Example calculations for total (add taxes, shipping, and discounts)
    const shippingCharge = 150; // Example shipping charge
    const discount = 200; // Example discount
    const estimatedTax = 100; // Example tax
    return this.calculateSubtotal() + shippingCharge - discount + estimatedTax;
  }
}
