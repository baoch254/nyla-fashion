import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FooterComponent, LayoutComponent, NavbarComponent } from './layouts';
import { appRoutes } from './app.routes';
import { IconModule } from './core-ui';

const LayoutComponents = [LayoutComponent, NavbarComponent, FooterComponent];

@NgModule({
  declarations: [AppComponent, LayoutComponents],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), IconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
