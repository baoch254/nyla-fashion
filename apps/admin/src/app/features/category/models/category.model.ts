import { SubCategoryModel } from './sub-category.model';

export interface CategoryModel {
  id?: number | null;
  name?: number | null;
  slug?: number | null;
  subCategories?: SubCategoryModel[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
