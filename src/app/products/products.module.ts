import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './allProducts/allProducts.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AllProductsComponent,MedicinesComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,MatPaginatorModule
  ]
})
export class ProductsModule { }
