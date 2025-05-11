import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './adminLayout/adminLayout.component';
import { AddProductComponent } from './addProduct/addProduct.component';
import { UsersComponent } from './users/users.component';
import { ProductListComponent } from './productList/productList.component';
import { EditProductDialogComponent } from './EditProductDialogComponent/EditProductDialogComponent.component';
import { ApprovalsComponent } from './Approvals/Approvals.component';
import { OrdersComponent } from './orders/orders.component'; // ✅ Import OrdersComponent

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AddProductComponent,
    UsersComponent,
    ProductListComponent,
    EditProductDialogComponent,
    ApprovalsComponent,
    OrdersComponent ,
    OrderDetailsDialogComponent// ✅ Added OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogActions,MatDialogContent
  ]
})
export class AdminModule { }
