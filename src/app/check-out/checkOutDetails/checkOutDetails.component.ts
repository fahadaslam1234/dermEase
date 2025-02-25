import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/productService';
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
  selectedShippingMethod: string = 'cod';

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
        totalAmount: this.calculateTotal()
      };
      console.log("in order place", orderData)

      if (this.checkoutForm.value.shippingMethod === 'cod') {
        this.checkoutService.placeOrder(orderData).subscribe(response => {
          console.log(orderData);
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.checkoutForm.reset(); // Reset form
          this.products = [];
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);

        });
      } else {
        this.checkoutService.createStripeSession(orderData).subscribe(session => {
          window.location.href = session.url;
        });
      }
    } else {
      alert('Please fill all required fields.');
    }
  }
}
