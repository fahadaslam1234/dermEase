import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './adminLayout/adminLayout.component';
import { AddProductComponent } from './addProduct/addProduct.component';
import { UsersComponent } from './users/users.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardModule } from '@angular/material/card';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from './productList/productList.component';
import { EditProductDialogComponent } from './EditProductDialogComponent/EditProductDialogComponent.component';
import { ApprovalsComponent } from './Approvals/Approvals.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AdminLayoutComponent,AddProductComponent,UsersComponent,ProductListComponent,EditProductDialogComponent,ApprovalsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,MatIconModule,
    MatSidenavModule,MatToolbarModule,MatButtonModule,
    MatListModule,MatExpansionModule,MatInputModule,MatInput,
    MatFormFieldModule,MatCardModule,MatCard,MatPaginator,MatPaginatorModule,
    MatTableModule,BrowserModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,
    MatOptionModule, MatSelectModule
  ]
})
export class AdminModule { }
