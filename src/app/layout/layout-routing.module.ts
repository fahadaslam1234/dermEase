import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './loginSignup/loginSignup.component';
import { AllProductsComponent } from '../products/allProducts/allProducts.component';
import { ViewCartComponent } from './viewCart/viewCart.component';

const routes: Routes = [
  {
    path:'shop/products',
    component: AllProductsComponent
  },
  {
    path:'login',
    component: LoginSignupComponent
  },
  {
    path: 'viewCart',
    component: ViewCartComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
