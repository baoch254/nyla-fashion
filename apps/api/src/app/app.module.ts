import { AllExceptionsFilter } from './exception/all-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { CategoryModule } from './features/category';
import { SubCategoryModule } from './features/sub-category';
import { ProductModule } from './features/product';
import { ColorModule } from './features/color';
import { SizeModule } from './features/size';

@Module({
  imports: [
    SizeModule,
    ColorModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
