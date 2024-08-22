import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DermConnectRoutingModule } from './derm-connect-routing.module';
import { DermConnectComponent } from './dermConnect/dermConnect.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { DoctorDetailsComponent } from './doctorDetails/doctorDetails.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DermConnectComponent,DoctorDetailsComponent],
  imports: [
    CommonModule,
    DermConnectRoutingModule,
    MatInputModule,MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,MatIconModule
  ]
})
export class DermConnectModule { }
