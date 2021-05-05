import { CategoryModel } from './category.model';

export interface SubCategoryModel {
  id?: number | null;
  name?: number | null;
  slug?: number | null;
  categoryId?: number | null;
  category?: CategoryModel | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
