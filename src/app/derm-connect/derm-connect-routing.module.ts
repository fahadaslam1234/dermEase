import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { DermConnectComponent } from './dermConnect/dermConnect.component';

const routes: Routes = [
  {
    path: 'dermConnect',
    component:DermConnectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DermConnectRoutingModule { }
