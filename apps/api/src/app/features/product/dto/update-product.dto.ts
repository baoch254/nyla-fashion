import { OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends OmitType(CreateProductDto, [
  'details',
] as const) {
  imageFront?: string;

  imageBack?: string;

  isPublic?: boolean;
}
