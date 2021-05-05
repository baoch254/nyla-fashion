import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateProductDetailDto } from './create-product-detail.dto';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  slug: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  categoryId: number;

  collectionId?: number;

  details?: CreateProductDetailDto[];
}
