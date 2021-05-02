import { SlugifyModule } from './../../common';
import { ApiDataAccessModule } from './../../db';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [ApiDataAccessModule, SlugifyModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
