import { IsNumber, IsPositive } from 'class-validator';

export class CreateProductDetailDto {
  @IsNumber()
  sizeId: number;

  @IsNumber()
  colorId: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  productId: number;
}
