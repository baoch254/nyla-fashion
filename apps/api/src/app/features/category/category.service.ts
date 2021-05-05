import { ApiDataAccessService } from './../../db';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Prisma } from '.prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly data: ApiDataAccessService) {}

  async create(data: Prisma.CategoryCreateInput) {
    const { name, slug } = data;
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
      data,
    });
  }

  async findAll(params: { skip?: number; take?: number; include?: number }) {
    const { skip, take, include } = params;

    let qParams = {};
    if (+skip >= 0) {
      qParams = { ...qParams, skip: +skip };
    }

    if (+take >= 0) {
      qParams = { ...qParams, take: +take };
    }

    let qInclude = null;
    if (+include > 0) {
      qInclude = {
        subCategories: true,
      };
    }

    const qTotalRecords = this.data.category.count();
    const qResults = this.data.category.findMany({
      ...qParams,
      include: qInclude,
    });

    const [results, totalRecords] = await this.data.$transaction([
      qResults,
      qTotalRecords,
    ]);

    return {
      results,
      totalRecords,
    };
  }

  findOne(categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput) {
    return this.data.category.findUnique({
      where: categoryWhereUniqueInput,
      include: {
        subCategories: true,
      },
    });
  }

  async update(
    where: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput
  ) {
    const { name, slug } = data as { name: string; slug: string };

    const existData = await this.data.category.findFirst({
      where: {
        name,
        slug,
      },
    });

    if (existData && existData.id !== where.id) {
      throw new BadRequestException('The name is existed!');
    }

    return await this.data.category.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.CategoryWhereUniqueInput) {
    const hasRelatedData = await this.data.subCategory.findFirst({
      where: {
        categoryId: where.id,
      },
    });

    if (hasRelatedData) {
      throw new ConflictException(
        'Can not delete this data because it related to other data'
      );
    }

    return await this.data.category.delete({
      where,
    });
  }
}
