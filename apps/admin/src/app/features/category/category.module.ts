import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NLBreadCrumbModule } from '../../core-ui';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { SubCategoryComponent } from './modules/sub-category/sub-category.component';
import { SubCategoryTableComponent } from './components/sub-category-table/sub-category-table.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
  {
    path: ':categoryId',
    component: SubCategoryComponent,
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
    RouterModule.forChild(routes),
  ],
  declarations: [
    CategoryTableComponent,
    SubCategoryTableComponent,
    CategoryComponent,
    SubCategoryComponent,
  ],
  exports: [CategoryComponent],
})
export class CategoryModule {}
