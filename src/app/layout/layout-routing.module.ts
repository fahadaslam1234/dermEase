import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './loginSignup/loginSignup.component';
import { AllProductsComponent } from '../products/allProducts/allProducts.component';
import { ViewCartComponent } from './viewCart/viewCart.component';
import { AddToCartComponent } from './addToCart/addToCart.component';
import { FAQsComponent } from './FAQs/FAQs.component';
import { PrivacyPolicyComponent } from './PrivacyPolicy/PrivacyPolicy.component';
import { RefundPolicyComponent } from './RefundPolicy/RefundPolicy.component';

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
  },{
    path: 'cart',
    component:AddToCartComponent
  },
  {
    path: 'faqs',
    component:FAQsComponent
  },
  {
    path: 'PrivacyPolicy',
    component:PrivacyPolicyComponent
  },
  {
    path: 'faqs',
    component:FAQsComponent
  },
  {
    path: 'PrivacyPolicy',
    component:PrivacyPolicyComponent
  },
  {
    path: 'RefundPolicy',
    component:RefundPolicyComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
