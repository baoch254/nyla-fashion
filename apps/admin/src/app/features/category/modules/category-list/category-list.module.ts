import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { TableModule } from 'primeng/table';

export const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  },
];

@NgModule({
  imports: [CommonModule, TableModule, RouterModule.forChild(routes)],
  declarations: [CategoryListComponent],
  exports: [CategoryListComponent],
})
export class CategoryListModule {}
