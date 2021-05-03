import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { IconModule, ProductListModule } from '../../core-ui';

const shopRoutes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
];

@NgModule({
  imports: [
    ProductListModule,
    IconModule,
    CommonModule,
    RouterModule.forChild(shopRoutes),
  ],
  declarations: [ShopComponent],
})
export class ShopModule {}
