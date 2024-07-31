import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuickViewProductComponent } from '../quickViewProduct/quickViewProduct.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/productModel';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../services/overlay.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  ngAfterViewInit(): void {}

  cartVisible = false;
  cartItems: any[] = [];

  paginatedProducts: Product[] = [];
  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12]; // Custom page size options
  pageEvent!: PageEvent;

  constructor(private dialog: MatDialog,  private cartService: CartService, private router: Router, private overlayService: OverlayService) { }

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
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P8.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P9.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P10.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P11.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P12.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P13.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P14.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P15.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P16.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P17.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P18.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P19.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P20.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P21.png',
      price: 2000
    },
    {
      name: 'Glass Skin Night Cream',
      image: '../../../assets/images/P22.png',
      price: 2000
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

  subscribeToCartUpdates() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.cartVisible = items.length > 0; // Automatically show cart when items are added
    });
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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartVisible = true; // Show the cart sidebar when an item is added

    this.subscribeToCartUpdates();
    this.overlayService.openCart();
  }

  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }
  checkout(){

  }
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    if (this.products.length === 0) {
      this.cartVisible = false; // Hide cart sidebar if no items are left
    }
  }

  getTotal(){
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


}
