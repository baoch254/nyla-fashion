import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductModel } from '../../common/models/product.model';

@Component({
  selector: 'nl-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products!: ProductModel[];
}
