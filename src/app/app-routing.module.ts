import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AllProductsComponent } from './products/allProducts/allProducts.component';

const routes: Routes = [
  
  {
    path:'',
    component: LayoutComponent,
  },
  {
    path:'shop/allprodcuts',
    component: AllProductsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
