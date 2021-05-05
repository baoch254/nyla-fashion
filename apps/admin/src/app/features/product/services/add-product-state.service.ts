import { Injectable } from '@angular/core';
import { ProductClientService } from '../../../common/api/product/product-client.service';
import { CategoryClient } from '../../../common/api';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../../category/models/category.model';
import { ColorClientService } from '../../../common/api/color-client.service';
import { SizeClientService } from '../../../common/api/size-client.service';
import { map } from 'rxjs/operators';
import { SizeModel } from '../../size/models/size.model';
import { ColorModel } from '../../color/models/color.model';
import { ProductDetailModel } from '../models/product-detail.model';
import { ProductDetailImageModel } from '../models/product-detail-image.model';

export interface IRelatedProduct {
  sizes: SizeModel[];
  colors: ColorModel[];
  categories: CategoryModel[];
}

@Injectable()
export class AddProductStateService {
  constructor(
    private sizeClient: SizeClientService,
    private colorClient: ColorClientService,
    private categoryClient: CategoryClient,
    private productClient: ProductClientService
  ) {}

  private readonly _productSub: BehaviorSubject<ProductModel> = new BehaviorSubject<ProductModel>(
    {}
  );

  readonly product$: Observable<ProductModel> = this._productSub.asObservable();

  fetchData(): Observable<IRelatedProduct> {
    return combineLatest([
      this.sizeClient.findAll({}),
      this.colorClient.findAll({}),
      this.categoryClient.findAll({ include: 1 }),
    ]).pipe(
      map(([sizes$, colors$, categories$]) => ({
        sizes: sizes$.results,
        colors: colors$.results,
        categories: categories$.results,
      }))
    );
  }

  findOne(id: number): void {
    this.productClient
      .findOne(id)
      .subscribe((data) => this._productSub.next(data));
  }

  createProduct(product: ProductModel): Observable<any> {
    return this.productClient.create(product);
  }

  updateProduct(id: number, product: ProductModel): void {
    this.productClient
      .update(id, product)
      .subscribe((data) => console.log(data));
  }

  createProductDetail(productDetail: ProductDetailModel): void {
    this.productClient.createDetail(productDetail).subscribe((data) => {
      const productId = data.productId as number;
      this.findOne(productId);
    });
  }

  updateProductDetail(id: number, productDetail: ProductDetailModel): void {
    this.productClient.updateDetail(id, productDetail).subscribe((data) => {
      const productId = data.productId as number;
      this.findOne(productId);
    });
  }

  deleteProductDetail(id: number): void {
    this.productClient.deleteDetail(id).subscribe((data) => {
      const productId = data.productId as number;
      this.findOne(productId);
    });
  }

  createProductDetailImage(detailId: number, file: any): void {
    this.productClient.uploadImage(file).subscribe((result) => {
      const detailImage: ProductDetailImageModel = {
        fromDetailID: detailId,
        image: result?.data?.url,
      };

      this.productClient.createDetailImage(detailImage).subscribe((data) => {
        this.findOne(this._productSub.value.id as number);
      });
    });
  }
}
