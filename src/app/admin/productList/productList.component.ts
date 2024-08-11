import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const PRODUCT_DATA: Product[] = [
  {
    id:1,
    name: 'Bundle 5',
    description: 'Bundle 5',
    image: '../../../assets/images/P1.png',
    price: 6500
  },
  {
    id:1,
    name: 'Bundle 5',
    description: 'Bundle 5',
    image: '../../../assets/images/P2.png',
    price: 6500
    
  },
  {
    id:1,
    name: 'Bundle 5',
    description: 'Bundle 5',
    image: '../../../assets/images/P3.png',
    price: 6500
    
  },
  {
    id:1,
    name: 'Bundle 5',
    description: 'Bundle 5',
    image: '../../../assets/images/P4.png',
    price: 6500
  },
];
@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'price'];
  dataSource = new MatTableDataSource<Product>(PRODUCT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}
}