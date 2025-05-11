import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/productModel';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
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
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    const savedForm = localStorage.getItem('checkoutData');

    if (savedForm) {
      this.checkoutForm.setValue(JSON.parse(savedForm));
    }

    // ✅ Fetch cart products and then check for Stripe return
    this.cartService.getItems().subscribe(products => {
      this.products = products;

      if (sessionId) {
        this.placeOrderAfterStripe(); // ✅ Called after products are loaded
      }
    });
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
        shippingMethod: this.selectedShippingMethod
      };

      if (this.selectedShippingMethod === 'cod') {
        this.checkoutService.placeOrder(orderData).subscribe(() => {
          alert('Order placed successfully!');
          this.clearOrderState();
        });
      } else if (this.selectedShippingMethod === 'stripe') {
        localStorage.setItem('checkoutData', JSON.stringify(this.checkoutForm.value));

        this.checkoutService.createStripeSession({
          ...orderData,
          successUrl: 'http://localhost:4200/checkout?session_id={CHECKOUT_SESSION_ID}' // Change in production
        }).subscribe(response => {
          if (response && response.url) {
            window.location.href = response.url;
          } else {
            alert('Stripe session failed.');
          }
        });
      }
    } else {
      alert('Please fill all required fields.');
    }
  }

  placeOrderAfterStripe(): void {
    const orderData = {
      ...this.checkoutForm.value,
      products: this.products,
      totalAmount: this.calculateTotal(),
      shippingMethod: 'stripe',
      paymentStatus: 'Paid'
    };

    console.log('📦 Sending order after Stripe:', orderData);

    this.checkoutService.placeOrder(orderData).subscribe(() => {
      alert('Stripe payment successful, order placed!');
      this.clearOrderState();
    }, error => {
      // console.error('❌ Failed to save order after Stripe:', error);
      // alert('Something went wrong after payment.');
    });
  }

  clearOrderState(): void {
    this.cartService.clearCart();
    this.checkoutForm.reset();
    this.products = [];
    localStorage.removeItem('checkoutData');
    setTimeout(() => this.router.navigate(['/']), 3000);
  }

  onShippingMethodChange(method: string): void {
    this.selectedShippingMethod = method;
  }
}
