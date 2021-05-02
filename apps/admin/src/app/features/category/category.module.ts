import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { categoryRoutes } from './category.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(categoryRoutes)],
})
export class CategoryModule {}
