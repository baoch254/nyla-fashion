import { HttpExceptionFilter } from './../../exception/http-exception.filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { SaveCategoryDto } from './dto/save-category.dto';
import { SlugifyService } from '../../common';
import { Request } from 'express';

@Controller('category')
@UseFilters(new HttpExceptionFilter())
export class CategoryController {
  constructor(
    private readonly slug: SlugifyService,
    private readonly service: CategoryService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: SaveCategoryDto) {
    const { name } = createCategoryDto;
    const slug = this.slug.slugify(name);
    return this.service.create({ name, slug });
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.service.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: SaveCategoryDto
  ) {
    const { name } = updateCategoryDto;
    const slug = this.slug.slugify(name);
    return this.service.update({ id }, { name, slug });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove({ id });
  }
}
