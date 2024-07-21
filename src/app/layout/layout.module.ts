import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsModule } from '../products/products.module';
import { CarosuelComponent } from './carosuel/carosuel.component';
import { LoginSignupComponent } from './loginSignup/loginSignup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,CarosuelComponent,LoginSignupComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProductsModule,FormsModule,ReactiveFormsModule
  ]
})
export class LayoutModule { }
