import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkincareSolutionFinderRoutingModule } from './skincare-solution-finder-routing.module';
import { SolutionFinderComponent } from './solutionFinder/solutionFinder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SolutionFinderComponent],
  imports: [
    CommonModule,
    SkincareSolutionFinderRoutingModule,MatStepperModule,
    MatIconModule,MatListModule, MatIcon, MatButtonModule,FormsModule,
    ReactiveFormsModule
  ]
})
export class SkincareSolutionFinderModule { }
