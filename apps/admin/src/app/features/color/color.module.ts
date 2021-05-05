import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from './color.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NLBreadCrumbModule } from '../../core-ui';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ColorTableComponent } from './components/color-table/color-table.component';
import { ColorPickerModule } from 'primeng/colorpicker';

const colorRoutes: Routes = [
  {
    path: '',
    component: ColorComponent,
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
    ColorPickerModule,
    RouterModule.forChild(colorRoutes),
  ],
  declarations: [ColorTableComponent, ColorComponent],
})
export class ColorModule {}
