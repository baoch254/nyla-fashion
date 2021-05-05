import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SizeComponent } from './size.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NLBreadCrumbModule } from '../../core-ui';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { SizeTableComponent } from './components/size-table/size-table.component';

const sizeRoutes: Routes = [
  {
    path: '',
    component: SizeComponent,
  },
];

@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    NLBreadCrumbModule,
    PaginatorModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(sizeRoutes),
  ],
  declarations: [SizeTableComponent, SizeComponent],
})
export class SizeModule {}
