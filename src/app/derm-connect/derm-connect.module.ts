import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DermConnectRoutingModule } from './derm-connect-routing.module';
import { DermConnectComponent } from './dermConnect/dermConnect.component';


@NgModule({
  declarations: [DermConnectComponent],
  imports: [
    CommonModule,
    DermConnectRoutingModule
  ]
})
export class DermConnectModule { }
