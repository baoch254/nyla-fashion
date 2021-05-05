import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { SlugifyService } from '../../common';
import { Request } from 'express';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';

@Controller('color')
@UseFilters(new HttpExceptionFilter())
export class ColorController {
  constructor(
    private readonly slug: SlugifyService,
    private readonly service: ColorService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createColorDto: CreateColorDto) {
    const { name } = createColorDto;
    createColorDto.slug = this.slug.slugify(name);
    return this.service.create(createColorDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.service.findAll(req.params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorDto: UpdateColorDto
  ) {
    const { name } = updateColorDto;
    updateColorDto.slug = this.slug.slugify(name);
    return this.service.update({ id }, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove({ id });
  }
}
