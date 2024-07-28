import { Component, OnInit } from '@angular/core';
import { QuickViewProductComponent } from '../../layout/quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../models/productModel';


@Component({
  selector: 'app-allProducts',
  templateUrl: './allProducts.component.html',
  styleUrls: ['./allProducts.component.css']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [
    {
      name: 'Bundle 5',
      image: '../../../assets/images/P1.png',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P2.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P3.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P4.png',
      price: 1900
    },
    {
      name: 'Bundle 5',
      image: '../../../assets/images/P5.png',
      oldPrice: 8100,
      price: 6500
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P6.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P7.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P8.png',
      price: 1900
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P9.png',
      price: 1900
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P10.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P11.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P12.png',
      price: 1900
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P13.png',
      price: 1900
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P14.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P15.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P16.png',
      price: 1900
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P17.png',
      price: 1900
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P18.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P19.png',
      price: 2000
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P20.png',
      price: 1900
    },
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P21.png',
      price: 1900
    },
    {
      name: 'Brightening Serum',
      image: '../../../assets/images/P22.png',
      price: 2350
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P23.png',
      price: 2000
    },
   
    {
      name: 'Glass Skin Moisturiser',
      image: '../../../assets/images/P24.png',
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

  selectOptions(product: Product) {
    console.log('Select Options:', product);
  }

  quickView(product: Product) {
    const dialogRef = this.dialog.open(QuickViewProductComponent, {
      width: '80%',
      maxWidth: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addToCart(product: Product) {
    console.log('Add to Cart:', product);
  }
}
