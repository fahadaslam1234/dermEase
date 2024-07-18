import { Component, OnInit } from '@angular/core';
import { QuickViewProductComponent } from '../../layout/quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../models/productModel';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  products : Product[] = [
    {
      name: 'Bundle 5',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 1900
    },
    {
      name: 'Bundle 5',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/Gluta-One-Night-Cream.jpg',
      price: 1900
    }
  ];

  paginatedProducts: Product[] = [];
  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12]; // Custom page size options
  pageEvent!: PageEvent;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.updatePaginatedProducts(0, this.pageSize);
  }
  
  updatePaginatedProducts(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.updatePaginatedProducts(event.pageIndex, event.pageSize);
  }

  
  selectOptions(product: any) {
    // Handle select options
    console.log('Select Options:', product);
  }

  quickView(product: any) {
    const dialogRef = this.dialog.open(QuickViewProductComponent, {
      width: '80%',
      maxWidth: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addToCart(product: any) {
    // Handle add to cart
    console.log('Add to Cart:', product);
  }

}
