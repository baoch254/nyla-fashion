import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiDataAccessService } from '../../db';
import { Prisma } from '.prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDetailImageDto } from './dto/create-product-detail-image.dto';

@Injectable()
export class ProductService {
  constructor(private readonly data: ApiDataAccessService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const dataProduct = { ...createProductDto };

      return await this.data.product.create({
        data: {
          ...dataProduct,
        },
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

    const qTotalRecords = this.data.product.count();
    const qResults = this.data.product.findMany({
      ...qParams,
      include: {
        collection: true,
        category: true,
        details: {
          include: {
            color: true,
            size: true,
          },
        },
      },
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

  findOne(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    return this.data.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        category: {
          include: {
            category: true,
          },
        },
        details: {
          include: {
            color: true,
            size: true,
            images: true,
          },
        },
      },
    });
  }

  async update(where: Prisma.ProductWhereUniqueInput, data: UpdateProductDto) {
    const {
      name,
      slug,
      description,
      price,
      categoryId,
      collectionId,
      imageFront,
      imageBack,
      isPublic,
    } = data;

    return await this.data.product.update({
      where,
      data: {
        name,
        slug,
        description,
        price,
        categoryId,
        collectionId,
        imageFront,
        imageBack,
        isPublic,
      },
    });
  }

  remove(where: Prisma.ProductWhereUniqueInput) {
    return this.data.product.delete({ where });
  }

  // Product Detail
  findOneDetail(detailId: number) {
    return this.data.product_Detail.findUnique({
      where: {
        id: detailId,
      },
      include: {
        product: true,
        size: true,
        color: true,
      },
    });
  }

  // Product Detail
  createDetail(data: CreateProductDetailDto) {
    const { sizeId, colorId, stock, price, productId } = data;

    return this.data.product_Detail.create({
      data: {
        sizeId,
        colorId,
        stock,
        price,
        productId,
      },
    });
  }

  updateDetail(
    where: Prisma.Product_DetailWhereUniqueInput,
    data: UpdateProductDetailDto
  ) {
    const { sizeId, colorId, stock, price, productId, images } = data;

    return this.data.product_Detail.update({
      where,
      data: {
        sizeId,
        colorId,
        stock,
        price,
        productId,
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });
  }

  async deleteDetail(where: Prisma.Product_DetailWhereUniqueInput) {
    const deleteDetailImages = this.data.product_Detail_Image.deleteMany({
      where: {
        fromDetailID: where.id,
      },
    });

    const deleteDetail = this.data.product_Detail.delete({
      where,
    });

    const [images, detail] = await this.data.$transaction([
      deleteDetailImages,
      deleteDetail,
    ]);

    return detail;
  }

  async createDetailImage(detailImage: CreateProductDetailImageDto) {
    const { fromDetailID, image } = detailImage;

    const detail = await this.data.product_Detail.findUnique({
      where: {
        id: fromDetailID,
      },
    });

    const product = await this.data.product.findUnique({
      where: {
        id: detail.productId,
      },
    });

    let needUpdate = false;
    if (product.imageFront == null) {
      product.imageFront = image;
      needUpdate = true;
    }

    if (!needUpdate && product.imageBack == null) {
      product.imageBack = image;
      needUpdate = true;
    }

    if (needUpdate) {
      await this.data.product.update({
        where: {
          id: detail.productId,
        },
        data: {
          ...product,
        },
      });
    }

    return await this.data.product_Detail_Image.create({
      data: {
        image,
        fromDetailID,
      },
    });
  }
}
