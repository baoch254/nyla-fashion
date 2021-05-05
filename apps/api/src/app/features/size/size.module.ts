import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { ApiDataAccessModule } from '../../db';
import { SlugifyModule } from '../../common';

@Module({
  imports: [ApiDataAccessModule, SlugifyModule],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
