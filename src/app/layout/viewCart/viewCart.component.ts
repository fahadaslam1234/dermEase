import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/productModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-viewCart',
  templateUrl: './viewCart.component.html',
  styleUrls: ['./viewCart.component.css']
})
export class ViewCartComponent implements OnInit {
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

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
  dataSource:any;
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal'];
  constructor(private cartService: CartService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort= this.sort;
  }
  
  ngOnInit(): void {
    // this.getData();
    this.dataSource = new MatTableDataSource(this.products);
  }

  addToCart(product : any){
    this.cartService.addToCart(product);
  }
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }
  calculateSubtotal(): number {
    return this.products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
  }

  calculateTotal(): number {
    // Add any additional calculations for total here (e.g., taxes, shipping)
    return this.calculateSubtotal();
  }





}
