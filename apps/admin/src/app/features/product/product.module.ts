import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NLBreadCrumbModule } from '../../core-ui';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { ViewProductComponent } from './modules/view-product/view-product.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ProductDetailTableComponent } from './components/product-detail-table/product-detail-table.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'add',
    component: AddProductComponent,
  },
  {
    path: ':id',
    component: ViewProductComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    NLBreadCrumbModule,
    PaginatorModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    InputSwitchModule,
    FileUploadModule,
    RouterModule.forChild(productRoutes),
  ],
  declarations: [
    ProductTableComponent,
    AddProductComponent,
    ViewProductComponent,
    ProductComponent,
    ProductDetailTableComponent,
  ],
})
export class ProductModule {}
