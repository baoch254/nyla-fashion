import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, BreadcrumbModule],
  exports: [BreadcrumbComponent],
})
export class NLBreadCrumbModule {}
