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
  UseFilters,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SlugifyService } from '../../common';
import { Request } from 'express';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';

@Controller('size')
@UseFilters(new HttpExceptionFilter())
export class SizeController {
  constructor(
    private readonly slug: SlugifyService,
    private readonly service: SizeService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSizeDto: CreateSizeDto) {
    const { name } = createSizeDto;
    createSizeDto.slug = this.slug.slugify(name);
    return this.service.create(createSizeDto);
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
    @Body() updateSizeDto: UpdateSizeDto
  ) {
    const { name } = updateSizeDto;
    updateSizeDto.slug = this.slug.slugify(name);
    return this.service.update({ id }, updateSizeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove({ id });
  }
}
