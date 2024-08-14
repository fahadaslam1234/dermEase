import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-quickViewProduct',
  templateUrl: './quickViewProduct.component.html',
  styleUrls: ['./quickViewProduct.component.css']
})
export class QuickViewProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
  }

  addToCart(product: any) {
    // Handle add to cart
    console.log('Add to Cart:', product);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  validateQuantity(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const maxQuantity = 20;

    if (+inputElement.value > maxQuantity) {
      inputElement.value = maxQuantity.toString();
    }
  }

}
