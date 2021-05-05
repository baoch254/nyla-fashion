import { IsArray } from 'class-validator';
import { CreateProductDetailImageDto } from './create-product-detail-image.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDetailDto } from './create-product-detail.dto';

export class UpdateProductDetailDto extends PartialType(
  CreateProductDetailDto
) {
  @IsArray()
  images: CreateProductDetailImageDto[];
}
