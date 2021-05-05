import { IsNotEmpty } from 'class-validator';

export class SaveCategoryDto {
  @IsNotEmpty()
  name: string;
}
