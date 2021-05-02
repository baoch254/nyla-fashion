import { Module } from '@nestjs/common';
import { SlugifyService } from './slugify.service';

@Module({
  controllers: [],
  providers: [SlugifyService],
  exports: [SlugifyService],
})
export class SlugifyModule {}
