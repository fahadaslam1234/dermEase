import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AllProductsComponent } from './products/allProducts/allProducts.component';
import { DiseasePredictorComponent } from './disease-predictor/diseasePredictor/diseasePredictor.component'; // ✅ Adjust if needed

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'shop/allprodcuts', component: AllProductsComponent },

  // ✅ Add these routes
  { path: 'skin-disease-predictor', component: DiseasePredictorComponent },
  { path: 'skin-disease-predictor/result', component: DiseasePredictorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
