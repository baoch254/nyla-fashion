import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductModel } from '../../common/models/product.model';
import { ProductDetailModel } from '../../common/models/product-detail.model';

@Component({
  selector: 'nl-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private _product!: ProductModel;

  details!: ProductDetailModel[];
  @Input()
  set product(product: ProductModel) {
    this._product = product;
    const existColor: string[] = [];

    this.details = this._product.details?.filter((detail) => {
      if (!existColor?.length) {
        const code = detail.color?.code as string;
        existColor.push(code);
        return true;
      }

      for (const code of existColor) {
        if (detail.color?.code === code) {
          return false;
        }
      }
      return true;
    }) as ProductDetailModel[];
  }

  get product(): ProductModel {
    return this._product;
  }

  defaultImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png';
}
