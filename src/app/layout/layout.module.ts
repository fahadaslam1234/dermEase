import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsModule } from '../products/products.module';
import { CarosuelComponent } from './carosuel/carosuel.component';
import { LoginSignupComponent } from './loginSignup/loginSignup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { QuickViewProductComponent } from './quickViewProduct/quickViewProduct.component';
import { AboutUsModule } from '../about-us/about-us.module';
import { ContactUsModule } from '../contact-us/contact-us.module';
import { ViewCartComponent } from './viewCart/viewCart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    LayoutComponent,CarosuelComponent,LoginSignupComponent,QuickViewProductComponent,ViewCartComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProductsModule,FormsModule,ReactiveFormsModule,
    MatIconModule,MatIcon,AboutUsModule,ContactUsModule,FlexLayoutModule,
    MatCardModule,MatFormField,MatLabel,MatPaginatorModule,MatSortModule,MatTableModule
  ]
})
export class LayoutModule { }
