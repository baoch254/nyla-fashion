import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FooterComponent, LayoutComponent, NavbarComponent } from './layouts';
import { appRoutes } from './app.routes';
import { IconModule } from './core-ui';
import { HttpClientModule } from '@angular/common/http';
import { getAppConfigProvider } from './app-config';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CartModule } from './core-ui/cart/cart.module';

const LayoutComponents = [LayoutComponent, NavbarComponent, FooterComponent];

@NgModule({
  declarations: [AppComponent, LayoutComponents],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    IconModule,
    CartModule,
  ],
  providers: [getAppConfigProvider(environment)],
  bootstrap: [AppComponent],
})
export class AppModule {}
