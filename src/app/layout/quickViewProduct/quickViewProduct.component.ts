import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LayoutComponent } from '../layout/layout.component';
import { Product } from 'src/app/models/productModel';
import { CartService } from 'src/app/services/cart.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-quickViewProduct',
  templateUrl: './quickViewProduct.component.html',
  styleUrls: ['./quickViewProduct.component.css']
})
export class QuickViewProductComponent implements OnInit {
  cartVisible = false;
  cartItems: any[] = [];
  products: Product[] = [];
  quantity: number = 1; // Default quantity

  constructor(
    public dialogRef: MatDialogRef<LayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private overlayService: OverlayService,
  ) {}

  ngOnInit() {
  }

  addToCart(product: Product) {

    const productWithQuantity = { ...product, quantity: this.quantity };
    console.log(this.products, productWithQuantity);

    // Call the cart service to add the product with quantity
    this.cartService.addToCart(productWithQuantity);
    this.cartVisible = true; // Show the cart sidebar when an item is added
    this.subscribeToCartUpdates();
    this.overlayService.openCart();
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  subscribeToCartUpdates() {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.cartVisible = items.length > 0; // Automatically show cart when items are added
    });
  }

  validateQuantity(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxQuantity = 5;

    if (+inputElement.value > maxQuantity) {
      inputElement.value = maxQuantity.toString();
    }
  }

}
