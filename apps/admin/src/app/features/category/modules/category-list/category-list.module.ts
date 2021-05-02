import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NLBreadCrumbModule } from './../../../../core-ui';

export const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    NLBreadCrumbModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CategoryListComponent],
  exports: [CategoryListComponent],
})
export class CategoryListModule {}
