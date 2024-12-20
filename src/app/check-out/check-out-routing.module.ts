import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutDetailsComponent } from './checkOutDetails/checkOutDetails.component';

const routes: Routes = [
  {
    path:'checkOut',
    component: CheckOutDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
