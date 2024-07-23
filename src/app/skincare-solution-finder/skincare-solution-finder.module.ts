import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkincareSolutionFinderRoutingModule } from './skincare-solution-finder-routing.module';
import { SolutionFinderComponent } from './solutionFinder/solutionFinder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCard, MatCardContent, MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SolutionFinderComponent],
  imports: [
    CommonModule,
    SkincareSolutionFinderRoutingModule,MatStepperModule,
    MatIconModule,MatListModule, MatIcon, MatButtonModule,FormsModule,
    ReactiveFormsModule,MatCardModule,MatCardContent,MatCard,NgxSpinnerModule,
    BrowserAnimationsModule
  ]
})
export class SkincareSolutionFinderModule { }
