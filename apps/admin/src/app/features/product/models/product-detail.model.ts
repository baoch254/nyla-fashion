import { ProductDetailImageModel } from './product-detail-image.model';
import { SizeModel } from '../../size/models/size.model';
import { ColorModel } from '../../color/models/color.model';

export interface ProductDetailModel {
  id?: number | null;
  productId?: number | null;
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
