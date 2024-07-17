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
@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,LayoutModule,
    ProductsModule, MatDialogModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
