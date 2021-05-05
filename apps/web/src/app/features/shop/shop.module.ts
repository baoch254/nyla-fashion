import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { IconModule, ProductListModule } from '../../core-ui';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';

const shopRoutes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
];

@NgModule({
  imports: [
    SliderModule,
    PaginatorModule,
    ProductListModule,
    IconModule,
    CommonModule,
    RouterModule.forChild(shopRoutes),
  ],
  declarations: [ShopComponent],
})
export class ShopModule {}
