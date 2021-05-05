import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../app-config/app-config.token';
import { AppConfig } from '../../../app-config/app.config';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../../../features/product/models/product.model';
import { ApiSearchResponse } from '../../models/api-search-response.model';
import { ProductDetailModel } from '../../../features/product/models/product-detail.model';
import { ProductDetailImageModel } from '../../../features/product/models/product-detail-image.model';

@Injectable({
  providedIn: 'root',
})
export class ProductClientService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  findAll(params: any) {
    return this.http.get<ApiSearchResponse<ProductModel>>(
      `${this.appConfig.baseURL}/product`,
      { params }
    );
  }

  findOne(id: number) {
    return this.http.get<ProductModel>(
      `${this.appConfig.baseURL}/product/${id}`
    );
  }

  create(product: ProductModel) {
    return this.http.post<ProductModel>(
      `${this.appConfig.baseURL}/product`,
      product
    );
  }

  update(id: number, product: ProductModel) {
    return this.http.patch<ProductModel>(
      `${this.appConfig.baseURL}/product/${id}`,
      product
    );
  }

  delete(id: number) {
    return this.http.delete<ProductModel>(
      `${this.appConfig.baseURL}/product/${id}`
    );
  }

  createDetail(productDetail: ProductDetailModel) {
    return this.http.post<ProductDetailModel>(
      `${this.appConfig.baseURL}/product/detail`,
      productDetail
    );
  }

  updateDetail(id: number, productDetail: ProductDetailModel) {
    return this.http.patch<ProductDetailModel>(
      `${this.appConfig.baseURL}/product/detail/${id}`,
      productDetail
    );
  }

  deleteDetail(id: number) {
    return this.http.delete<ProductDetailModel>(
      `${this.appConfig.baseURL}/product/detail/${id}`
    );
  }

  createDetailImage(detailImage: ProductDetailImageModel) {
    return this.http.post<ProductDetailImageModel>(
      `${this.appConfig.baseURL}/product/detail/image`,
      detailImage
    );
  }

  uploadImage(file: any) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<any>(
      `https://api.imgbb.com/1/upload?expiration=15552000&key=${this.appConfig.imgKey}`,
      formData
    );
  }
}
