import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasePredictorRoutingModule } from './disease-predictor-routing.module';
import { DiseasePredictorComponent } from './diseasePredictor/diseasePredictor.component';


@NgModule({
  declarations: [DiseasePredictorComponent],
  imports: [
    CommonModule,
    DiseasePredictorRoutingModule
  ]
})
export class DiseasePredictorModule { }
