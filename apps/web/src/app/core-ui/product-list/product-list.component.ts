import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nl-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {}
