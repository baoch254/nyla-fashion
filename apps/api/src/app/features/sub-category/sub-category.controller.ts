import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { SlugifyService } from '../../common';
import { Request } from 'express';

@Controller('sub-category')
@UseFilters(new HttpExceptionFilter())
export class SubCategoryController {
  constructor(
    private readonly slug: SlugifyService,
    private readonly service: SubCategoryService
  ) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    const { name, categoryId } = createSubCategoryDto;
    const slug = this.slug.slugify(name);
    return this.service.create({
      name,
      slug,
      category: { connect: { id: categoryId } },
    });
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
    @Body() updateSubCategoryDto: UpdateSubCategoryDto
  ) {
    const { name } = updateSubCategoryDto;
    const slug = this.slug.slugify(name);
    return this.service.update({ id }, { name, slug });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove({ id });
  }
}
