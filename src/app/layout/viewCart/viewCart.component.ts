import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/productModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewCart',
  templateUrl: './viewCart.component.html',
  styleUrls: ['./viewCart.component.css']
})
export class ViewCartComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  cartItems: Product[] = []; // Updated to reflect cart items only
  dataSource = new MatTableDataSource<Product>(this.cartItems);
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal'];

  constructor(private cartService: CartService, private router : Router) {}

  ngOnInit(): void {
    this.subscribeToCartUpdates(); // Subscribe to cart updates on initialization
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Subscribe to cart updates and update the data source
  subscribeToCartUpdates(): void {
    this.cartService.getItems().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.dataSource.data = this.cartItems; // Update the table with cart items
    });
  }

  // Add item to cart and refresh the table
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.refreshCartData();
  }

  // Remove one quantity of an item from the cart and refresh the table
  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.refreshCartData();
  }

  // Remove an item completely from the cart and refresh the table
  removeItemCompletely(product: Product): void {
    this.cartService.removeItemCompletely(product);
    this.refreshCartData();
  }

  // Calculate the subtotal for an item
  calculateItemSubtotal(product: Product): number {
    return product.price * (product.quantity || 1);
  }

  // Calculate the total subtotal of the cart
  calculateSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + this.calculateItemSubtotal(item), 0);
  }

  // Refresh the cart data source
  private refreshCartData(): void {
    this.subscribeToCartUpdates();
  }

  checkout(): void {
    this.router.navigate(['/checkOut']);
  }
}
