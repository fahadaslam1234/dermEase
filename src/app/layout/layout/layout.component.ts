import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuickViewProductComponent } from '../quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/productModel';
import { PageEvent } from '@angular/material/paginator';
import { LoginSignupComponent } from '../loginSignup/loginSignup.component';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  ngAfterViewInit(): void {}

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


  products = [
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
