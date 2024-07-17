import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsModule } from '../products/products.module';
import { CarosuelComponent } from './carosuel/carosuel.component';


@NgModule({
  declarations: [
    LayoutComponent,CarosuelComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProductsModule,
  ]
})
export class LayoutModule { }
