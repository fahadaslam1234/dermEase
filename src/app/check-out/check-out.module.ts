import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutDetailsComponent } from './checkOutDetails/checkOutDetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ContactUsModule } from '../contact-us/contact-us.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [CheckOutDetailsComponent],
  imports: [
    CommonModule,CheckOutRoutingModule,FormsModule,ReactiveFormsModule,
    MatIconModule,MatIcon,ContactUsModule,
    MatCardModule,MatFormField,MatLabel,MatPaginatorModule,MatSortModule,MatTableModule,
    MatFormFieldModule,MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class CheckOutModule { }
