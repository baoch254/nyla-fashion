import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ApiDataAccessService } from '../../db';
import { Prisma } from '.prisma/client';

@Injectable()
export class SubCategoryService {
  constructor(private readonly data: ApiDataAccessService) {}

  async create(data: Prisma.SubCategoryCreateInput) {
    const { name, slug } = data;
    const existData = await this.data.subCategory.findFirst({
      where: {
        categoryId: data.category.connect.id,
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

    return await this.data.subCategory.create({
      data,
    });
  }

  async findAll(params: { skip?: number; take?: number; categoryId?: number }) {
    const { skip, take, categoryId } = params;

    let qParams = {};
    if (+skip >= 0) {
      qParams = { ...qParams, skip: +skip };
    }

    if (+take >= 0) {
      qParams = { ...qParams, take: +take };
    }
    let where = {};
    if (+categoryId) {
      where = { ...where, categoryId: +categoryId };
    }

    const qTotalRecords = this.data.subCategory.count();
    const qResults = this.data.subCategory.findMany({
      ...qParams,
      where,
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

  findOne(subCategoryWhereUniqueInput: Prisma.SubCategoryWhereUniqueInput) {
    return this.data.subCategory.findUnique({
      where: subCategoryWhereUniqueInput,
    });
  }

  async update(
    where: Prisma.SubCategoryWhereUniqueInput,
    data: Prisma.SubCategoryUpdateInput
  ) {
    const { name, slug } = data as { [key: string]: string };
    const dataSubCategory = await this.data.subCategory.findFirst({ where });

    const existData = await this.data.subCategory.findFirst({
      where: {
        categoryId: dataSubCategory.categoryId,
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

    if (existData && existData.id !== where.id) {
      throw new BadRequestException('The name is existed!');
    }

    return await this.data.subCategory.update({
      where,
      data,
    });
  }

  async remove(where: Prisma.SubCategoryWhereUniqueInput) {
    const hasRelatedData = await this.data.product.findFirst({
      where: {
        categoryId: where.id,
      },
    });

    if (hasRelatedData) {
      throw new ConflictException(
        'Can not delete this data because it related to other data'
      );
    }

    return await this.data.subCategory.delete({
      where,
    });
  }
}
