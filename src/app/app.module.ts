import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductsModule } from './products/products.module';
import { LayoutModule } from './layout/layout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { SkincareSolutionFinderModule } from './skincare-solution-finder/skincare-solution-finder.module';
@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,LayoutModule,
    ProductsModule, MatDialogModule,MatPaginatorModule,
    FormsModule,ReactiveFormsModule,MatButtonModule,MatListModule,
    MatStepperModule, MatIconModule, BrowserAnimationsModule, SkincareSolutionFinderModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
