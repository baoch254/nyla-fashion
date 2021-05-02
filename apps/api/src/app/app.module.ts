import { AllExceptionsFilter } from './exception/all-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { CategoryModule } from './features/category';
@Module({
  imports: [CategoryModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
