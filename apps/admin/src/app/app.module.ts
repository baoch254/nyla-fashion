import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app.routes';
import { IconModule } from './core-ui';
import {
  MainLayoutComponent,
  SidebarComponent,
  TopbarComponent,
} from './layouts';
import { BreadcrumbModule } from 'primeng/breadcrumb';

const PrimeNGModules = [BreadcrumbModule];

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
    CommonModule,
    IconModule,
    PrimeNGModules,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
