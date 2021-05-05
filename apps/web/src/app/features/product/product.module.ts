import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductListModule } from '../../core-ui';

const productRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/shop',
  },
  {
    path: ':productSlug',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [
    ProductListModule,
    CommonModule,
    RouterModule.forChild(productRoutes),
  ],
  declarations: [ProductComponent],
})
export class ProductModule {}
