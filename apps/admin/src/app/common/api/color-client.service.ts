import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../app-config/app-config.token';
import { AppConfig } from '../../app-config/app.config';
import { HttpClient } from '@angular/common/http';
import { ApiSearchResponse } from '../models/api-search-response.model';
import { ColorModel } from '../../features/color/models/color.model';

@Injectable({
  providedIn: 'root',
})
export class ColorClientService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  findAll(params: any) {
    return this.http.get<ApiSearchResponse<ColorModel>>(
      `${this.appConfig.baseURL}/color`,
      { params }
    );
  }

  create(color: ColorModel) {
    return this.http.post<ColorModel>(`${this.appConfig.baseURL}/color`, color);
  }

  update(id: number, color: ColorModel) {
    return this.http.patch<ColorModel>(
      `${this.appConfig.baseURL}/color/${id}`,
      color
    );
  }

  delete(id: number) {
    return this.http.delete<ColorModel>(
      `${this.appConfig.baseURL}/color/${id}`
    );
  }
}
