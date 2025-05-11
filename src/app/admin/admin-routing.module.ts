import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './adminLayout/adminLayout.component';
import { UsersComponent } from './users/users.component';
import { AddProductComponent } from './addProduct/addProduct.component';
import { ProductListComponent } from './productList/productList.component';
import { OrdersComponent } from './orders/orders.component';
import { ApprovalsComponent } from './Approvals/Approvals.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'view-users', component: UsersComponent },
      { path: 'add-products', component: AddProductComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'all-orders', component: OrdersComponent },
      { path: 'approvals', component: ApprovalsComponent },
      { path: '', redirectTo: 'view-users', pathMatch: 'full' } // default admin page
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
