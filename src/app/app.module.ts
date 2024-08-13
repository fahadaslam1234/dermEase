import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductsModule } from './products/products.module';
import { LayoutModule } from './layout/layout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { SkincareSolutionFinderModule } from './skincare-solution-finder/skincare-solution-finder.module';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { ServerModule } from '@angular/platform-server';
import { AdminModule } from './admin/admin.module';
import { isPlatformBrowser } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DermConnectModule } from './derm-connect/derm-connect.module';
import { DiseasePredictorModule } from './disease-predictor/disease-predictor.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'your-app-id' }),
    AppRoutingModule,
    LayoutModule,
    NgxSpinnerModule,
    ProductsModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatStepperModule,
    MatIconModule,
    SkincareSolutionFinderModule,
    MatCardModule,
    HttpClientModule,
    FlexLayoutServerModule,
    ServerModule,
    AdminModule,
    DermConnectModule,
    DiseasePredictorModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      import('@angular/platform-browser/animations').then(module => {
        const BrowserAnimationsModule = module.BrowserAnimationsModule;
      });
    }
  }
}
