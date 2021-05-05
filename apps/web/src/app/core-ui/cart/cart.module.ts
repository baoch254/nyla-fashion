import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [CartComponent],
  exports: [CartComponent],
  imports: [SidebarModule, CommonModule],
})
export class CartModule {}
