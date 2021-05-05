import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ApiDataAccessModule } from '../../db';
import { SlugifyModule } from '../../common';

@Module({
  imports: [ApiDataAccessModule, SlugifyModule],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
