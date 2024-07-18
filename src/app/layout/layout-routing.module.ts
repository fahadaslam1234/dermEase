import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicinesComponent } from '../products/medicines/medicines.component';

const routes: Routes = [
  {
    path:'shop/medicines',
    component: MedicinesComponent
  },
  {
    path:'shop/allessentials',
    component: MedicinesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
