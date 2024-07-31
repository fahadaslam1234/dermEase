import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/productModel';
import { CartService } from '../../services/cart.service';

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  originalPrice?: number; // Optional for items on discount
}

@Component({
  selector: 'app-checkOutDetails',
  templateUrl: './checkOutDetails.component.html',
  styleUrls: ['./checkOutDetails.component.css']
})
export class CheckOutDetailsComponent implements OnInit {
  products: Product[] = [
    {
      name: 'Bundle 5',
      image: '../../../assets/images/P1.png',
      oldPrice: 8100,
      price: 6500,
      quantity:1
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P2.png',
      price: 2350,
      quantity:1
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P3.png',
      price: 2000,
      quantity:1
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P4.png',
      price: 1900,
      quantity:1
    },
  ];
  countries = ['Pakistan', 'Canada', 'UK', 'Australia', 'India'];
  selectedShippingMethod: string = 'cod'; // Default shipping method

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(products => {
      this.products = products;
    });
  }
  calculateTotalOfItem(product: Product): number {
    return product.price * (product.quantity || 1);
  }


  calculateSubtotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  calculateTotal(): number {
    // Add any additional calculations for total here (e.g., taxes, shipping)
    const shippingCharge = 25; // Example shipping charge
    const discount = 78; // Example discount
    const estimatedTax = 18.20; // Example tax
    return this.calculateSubtotal() + shippingCharge - discount + estimatedTax;
  }
}
