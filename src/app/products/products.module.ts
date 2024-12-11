import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './allProducts/allProducts.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailsComponent } from './productDetails/productDetails.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllProductsComponent,ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,MatPaginatorModule,
    MatIconModule,FormsModule
  ]
})
export class ProductsModule { }
