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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminLayoutComponent,AddProductComponent,UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,MatIconModule,
    MatSidenavModule,MatToolbarModule,MatButtonModule,
    MatListModule,MatExpansionModule,MatInputModule,MatInput,
    MatFormFieldModule,MatCardModule,MatCard
  ]
})
export class AdminModule { }
