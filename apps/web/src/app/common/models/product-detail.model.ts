import { ProductDetailImageModel } from './product-detail-image.model';
import { SizeModel } from './size.model';
import { ColorModel } from './color.model';
import { ProductModel } from './product.model';

export interface ProductDetailModel {
  id?: number | null;
  productId?: number | null;
  product?: ProductModel | null;
  sizeId?: number | null;
  size?: SizeModel | null;
  colorId?: number | null;
  color?: ColorModel | null;
  stock?: number | null;
  price?: number | null;
  images?: ProductDetailImageModel[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
