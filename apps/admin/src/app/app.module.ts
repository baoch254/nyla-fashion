import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app.routes';
import { IconModule } from './core-ui';

import { SlideMenuModule } from 'primeng/slidemenu';
import { environment } from '../environments/environment';
import { getAppConfigProvider } from './app-config/app-config.token';

import {
  MainLayoutComponent,
  SidebarComponent,
  TopbarComponent,
} from './layouts';
import { HttpClientModule } from '@angular/common/http';

const LayoutComponents = [
  MainLayoutComponent,
  TopbarComponent,
  SidebarComponent,
];

@NgModule({
  declarations: [AppComponent, LayoutComponents],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    IconModule,
    SlideMenuModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [getAppConfigProvider(environment)],
  bootstrap: [AppComponent],
})
export class AppModule {}
