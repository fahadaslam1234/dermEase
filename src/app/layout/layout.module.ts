import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductsModule } from '../products/products.module';
import { CarosuelComponent } from './carosuel/carosuel.component';
import { LoginSignupComponent } from './loginSignup/loginSignup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { QuickViewProductComponent } from './quickViewProduct/quickViewProduct.component';
=======
import { AboutUsModule } from '../about-us/about-us.module';
import { ContactUsModule } from '../contact-us/contact-us.module';
>>>>>>> 8f845cd5f3ab129dfa4989e61e629270f1fc94e9


@NgModule({
  declarations: [
    LayoutComponent,CarosuelComponent,LoginSignupComponent,QuickViewProductComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProductsModule,FormsModule,ReactiveFormsModule,
    MatIconModule,MatIcon
  ]
})
export class LayoutModule { }
