import { SlugifyService } from './../../common';
import { ApiDataAccessService } from './../../db';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '.prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    private readonly data: ApiDataAccessService,
    private slug: SlugifyService
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;
    const slug = this.slug.slugify(name);

    const existData = await this.data.category.findFirst({
      where: {
        OR: [
          {
            name,
          },
          {
            slug,
          },
        ],
      },
    });

    if (existData) {
      throw new BadRequestException('The name is existed!');
    }

    return await this.data.category.create({
      data: { name, slug: this.slug.slugify(name) },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.data.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    return await this.data.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const { name } = updateCategoryDto;

    return await this.data.category.update({
      where: {
        id,
      },
      data: { name, slug: this.slug.slugify(name) },
    });
  }

  async remove(id: number): Promise<Category> {
    return await this.data.category.delete({
      where: {
        id,
      },
    });
  }
}
