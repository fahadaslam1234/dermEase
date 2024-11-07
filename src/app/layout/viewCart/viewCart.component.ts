import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../services/productService';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/productModel';

@Component({
  selector: 'app-viewCart',
  templateUrl: './viewCart.component.html',
  styleUrls: ['./viewCart.component.css']
})
export class ViewCartComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.products);
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal'];

  constructor(
    private productService: ProductService, // Inject ProductService
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.subscribeToCartUpdates();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Fetch products from the backend using ProductService
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.dataSource.data = products; // Update table data source
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  // Subscribe to cart updates and update the table
  subscribeToCartUpdates() {
    this.cartService.getItems().subscribe(products => {
      this.products = products;
      this.dataSource.data = products; // Update the table when cart changes
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.subscribeToCartUpdates(); // Re-subscribe to update changes
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.subscribeToCartUpdates(); // Re-subscribe to update changes
  }

  calculateSubtotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  calculateTotal(): number {
    // You can add extra calculations like shipping or taxes
    return this.calculateSubtotal();
  }
}
