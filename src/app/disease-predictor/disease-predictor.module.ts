import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasePredictorRoutingModule } from './disease-predictor-routing.module';
import { DiseasePredictorComponent } from './diseasePredictor/diseasePredictor.component';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [DiseasePredictorComponent],
  imports: [
    CommonModule,
    DiseasePredictorRoutingModule,MatStepperModule
  ]
})
export class DiseasePredictorModule { }
