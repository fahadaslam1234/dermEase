import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './adminLayout/adminLayout.component';
import { UsersComponent } from './users/users.component';
import { AddProductComponent } from './addProduct/addProduct.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent
  },
  // {
  //   path:'users',
  //   component: UsersComponent
  // },
  // {
  //   path:'admin/product/addProduct',
  //   component:AddProductComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
