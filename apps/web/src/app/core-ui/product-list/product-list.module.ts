import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [ProductModule, CommonModule],
  exports: [ProductListComponent],
})
export class ProductListModule {}
