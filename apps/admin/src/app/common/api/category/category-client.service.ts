import { AppConfig } from './../../../app-config/app.config';
import { APP_CONFIG } from './../../../app-config/app-config.token';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../../../features/category/models/category.model';
import { ApiSearchResponse } from '../../models/api-search-response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryClient {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  findAll(params: any) {
    return this.http.get<ApiSearchResponse<CategoryModel>>(
      `${this.appConfig.baseURL}/category`,
      { params }
    );
  }

  create(category: CategoryModel) {
    return this.http.post<CategoryModel>(
      `${this.appConfig.baseURL}/category`,
      category
    );
  }

  update(id: number, category: CategoryModel) {
    return this.http.patch<CategoryModel>(
      `${this.appConfig.baseURL}/category/${id}`,
      category
    );
  }

  delete(id: number) {
    return this.http.delete<CategoryModel>(
      `${this.appConfig.baseURL}/category/${id}`
    );
  }
}
