import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ApiDataAccessModule } from '../../db';
import { SlugifyModule } from '../../common';

@Module({
  imports: [ApiDataAccessModule, SlugifyModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
