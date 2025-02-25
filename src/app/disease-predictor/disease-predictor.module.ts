import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasePredictorRoutingModule } from './disease-predictor-routing.module';
import { DiseasePredictorComponent } from './diseasePredictor/diseasePredictor.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DiseasePredictorComponent],
  imports: [
    CommonModule,
    DiseasePredictorRoutingModule,MatStepperModule,
    MatIconModule,MatExpansionModule,NgxSpinnerModule
  ]
})
export class DiseasePredictorModule { }
