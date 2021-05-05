import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Prisma } from '.prisma/client';
import { ApiDataAccessService } from '../../db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class ColorService {
  constructor(private readonly data: ApiDataAccessService) {}

  async create(createColorDto: CreateColorDto) {
    try {
      return await this.data.color.create({
        data: createColorDto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        const { code } = e;
        switch (code) {
          case 'P2002':
            throw new BadRequestException('The name is existed!');
            break;
          default:
            throw e;
        }
      }
    }
  }

  async findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    let qParams = {};
    if (+skip >= 0) {
      qParams = { ...qParams, skip: +skip };
    }

    if (+take >= 0) {
      qParams = { ...qParams, take: +take };
    }

    const qTotalRecords = this.data.color.count();
    const qResults = this.data.color.findMany({
      ...qParams,
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

  findOne(where: Prisma.ColorWhereUniqueInput) {
    return this.data.color.findUnique({
      where,
    });
  }

  async update(
    where: Prisma.ColorWhereUniqueInput,
    updateColorDto: UpdateColorDto
  ) {
    try {
      return await this.data.color.update({
        where,
        data: updateColorDto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        const { code } = e;
        switch (code) {
          case 'P2002':
            throw new BadRequestException('The name is existed!');
            break;
          default:
            throw e;
        }
      }
    }
  }

  remove(where: Prisma.ColorWhereUniqueInput) {
    return this.data.color.delete({ where });
  }
}
