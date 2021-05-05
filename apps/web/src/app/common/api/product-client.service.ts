import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../app-config';
import { ApiSearchResponse } from '../models/api-search-response.model';
import { ProductModel } from '../models/product.model';
import { ProductDetailModel } from '../models/product-detail.model';

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

  findByName(slug: string) {
    return this.http.get<ProductModel>(
      `${this.appConfig.baseURL}/product/u/${slug}`
    );
  }

  findOneDetail(id: number) {
    return this.http.get<ProductDetailModel>(
      `${this.appConfig.baseURL}/product/detail/${id}`
    );
  }
}
