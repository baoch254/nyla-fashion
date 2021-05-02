import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface Product {
  code?: string | null;
  name?: string | null;
  category?: string | null;
  quantity?: number | null;
}

@Component({
  selector: 'nl-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  products: Product[] = [{}, {}];
}
