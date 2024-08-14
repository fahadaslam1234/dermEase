import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseasePredictorComponent } from './diseasePredictor/diseasePredictor.component';

const routes: Routes = [
  {
    path: 'diseasePredictor',
    component:DiseasePredictorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseasePredictorRoutingModule { }
