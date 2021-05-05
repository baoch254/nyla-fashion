import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDetailImageDto {
  @IsNotEmpty()
  image: string;

  @IsNumber()
  fromDetailID: number;
}
