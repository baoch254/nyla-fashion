import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SlugifyModule } from '../../common';
import { ApiDataAccessModule } from '../../db';

@Module({
  imports: [SlugifyModule, ApiDataAccessModule],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
