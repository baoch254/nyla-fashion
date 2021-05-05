import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SlugifyService } from '../../common';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { Request, Express } from 'express';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDetailImageDto } from './dto/create-product-detail-image.dto';

@Controller('product')
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(
    private readonly slug: SlugifyService,
    private readonly service: ProductService
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const { name } = createProductDto;
    createProductDto.slug = this.slug.slugify(name);
    return this.service.create(createProductDto);
    return;
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.service.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne({ id });
  }

  @Get('/u/:slug')
  findByName(@Param('slug') slug: string) {
    return this.service.findOne({ slug });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const { name } = updateProductDto;
    updateProductDto.slug = this.slug.slugify(name);
    return this.service.update({ id }, { ...updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove({ id });
  }

  // Product Detail
  @Post('/detail')
  createDetail(@Body() createProductDetailDto: CreateProductDetailDto) {
    return this.service.createDetail(createProductDetailDto);
  }

  @Get('/detail/:id')
  findOneDetail(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneDetail(id);
  }

  @Patch('/detail/:id')
  updateDetail(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDetailDto: UpdateProductDetailDto
  ) {
    return this.service.updateDetail({ id }, updateProductDetailDto);
  }

  @Delete('/detail/:id')
  deleteDetail(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteDetail({ id });
  }

  @Post('/detail/image')
  async createDetailImage(
    @Body() createProductDetailImageDto: CreateProductDetailImageDto
  ) {
    return this.service.createDetailImage(createProductDetailImageDto);
  }
}
