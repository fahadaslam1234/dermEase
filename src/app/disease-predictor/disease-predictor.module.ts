import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasePredictorRoutingModule } from './disease-predictor-routing.module';
import { DiseasePredictorComponent } from './diseasePredictor/diseasePredictor.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DiseasePredictorComponent],
  imports: [
    CommonModule,
    DiseasePredictorRoutingModule,MatStepperModule,
    MatIconModule
  ]
})
export class DiseasePredictorModule { }
