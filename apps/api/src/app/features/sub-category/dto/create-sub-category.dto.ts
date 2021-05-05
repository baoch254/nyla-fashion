import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNumber()
  categoryId: number;
}
