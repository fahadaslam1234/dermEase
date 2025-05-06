import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/productModel';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkOutDetails',
  templateUrl: './checkOutDetails.component.html',
  styleUrls: ['./checkOutDetails.component.css']
})
export class CheckOutDetailsComponent implements OnInit {
  checkoutForm!: FormGroup;
  products: Product[] = [];
  countries = ['Pakistan', 'Canada', 'UK', 'Australia', 'India'];
  selectedShippingMethod: string = 'cod'; // 👈 Added this line

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      shippingMethod: ['cod', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCartProducts();
  }

  fetchCartProducts(): void {
    this.cartService.getItems().subscribe(products => {
      this.products = products;
    });
  }

  calculateSubtotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  calculateTotal(): number {
    const shippingCharge = 150;
    const discount = 200;
    const estimatedTax = 100;
    return this.calculateSubtotal() + shippingCharge - discount + estimatedTax;
  }

  placeOrder(): void {
    if (this.checkoutForm.valid) {
      const orderData = {
        ...this.checkoutForm.value,
        products: this.products,
        totalAmount: this.calculateTotal(),
        shippingMethod: this.selectedShippingMethod // 👈 Use selectedShippingMethod
      };
      console.log("in order place", orderData);

      if (this.selectedShippingMethod === 'cod') {
        // COD flow
        this.checkoutService.placeOrder(orderData).subscribe(response => {
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.checkoutForm.reset();
          this.products = [];
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        });
      } else if (this.selectedShippingMethod === 'stripe') {
        // Stripe flow
        this.checkoutService.createStripeSession(orderData).subscribe(response => {
          if (response && response.url) {
            window.location.href = response.url; // Redirect to Stripe checkout page
          } else {
            alert('Something went wrong with Stripe session.');
          }
        }, error => {
          console.error('Stripe session creation error:', error);
          alert('Stripe session creation failed.');
        });
      }
    } else {
      alert('Please fill all required fields.');
    }
  }

  // 👇 Add method to update shipping method dynamically
  onShippingMethodChange(method: string): void {
    this.selectedShippingMethod = method;
  }
}
