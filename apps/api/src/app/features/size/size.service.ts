import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiDataAccessService } from '../../db';
import { Prisma } from '.prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class SizeService {
  constructor(private readonly data: ApiDataAccessService) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      return await this.data.size.create({
        data: createSizeDto,
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

    const qTotalRecords = this.data.size.count();
    const qResults = this.data.size.findMany({
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

  findOne(where: Prisma.SizeWhereUniqueInput) {
    return this.data.size.findUnique({
      where,
    });
  }

  async update(
    where: Prisma.SizeWhereUniqueInput,
    updateSizeDto: UpdateSizeDto
  ) {
    try {
      return await this.data.size.update({
        where,
        data: updateSizeDto,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        const { code } = e;
        switch (code) {
          case 'P2025':
            throw new BadRequestException('Id is not founded!');
            break;
          case 'P2002':
            throw new BadRequestException('The name is existed!');
            break;
          default:
            throw e;
        }
      }
    }
  }

  remove(where: Prisma.SizeWhereUniqueInput) {
    return this.data.size.delete({ where });
  }
}
