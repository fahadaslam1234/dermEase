import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './allProducts/allProducts.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AllProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,MatPaginatorModule,
    MatIconModule
  ]
})
export class ProductsModule { }
