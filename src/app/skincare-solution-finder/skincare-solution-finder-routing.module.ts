import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionFinderComponent } from './solutionFinder/solutionFinder.component';

const routes: Routes = [
  {
    path:'solutionFinder',
    component: SolutionFinderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkincareSolutionFinderRoutingModule { }
