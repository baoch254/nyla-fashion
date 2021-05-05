import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../app-config/app-config.token';
import { AppConfig } from '../../../app-config/app.config';
import { HttpClient } from '@angular/common/http';
import { SubCategoryModel } from '../../../features/category/models/sub-category.model';
import { ApiSearchResponse } from '../../models/api-search-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryClientService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  findAll(params: any) {
    return this.http.get<ApiSearchResponse<SubCategoryModel>>(
      `${this.appConfig.baseURL}/sub-category`,
      { params }
    );
  }

  create(subCategory: SubCategoryModel) {
    return this.http.post<SubCategoryModel>(
      `${this.appConfig.baseURL}/sub-category`,
      subCategory
    );
  }

  update(id: number, subCategory: SubCategoryModel) {
    return this.http.patch<SubCategoryModel>(
      `${this.appConfig.baseURL}/sub-category/${id}`,
      subCategory
    );
  }

  delete(id: number) {
    return this.http.delete<SubCategoryModel>(
      `${this.appConfig.baseURL}/sub-category/${id}`
    );
  }
}
