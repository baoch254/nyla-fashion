import { ProductDetailModel } from './product-detail.model';
import { SubCategoryModel } from './sub-category.model';

export interface ProductModel {
  id?: number | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  details?: ProductDetailModel[] | null;
  price?: number | null;
  imageFront?: string | null;
  imageBack?: string | null;
  categoryId?: number | null;
  category?: SubCategoryModel | null;
  isPublic?: boolean | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
