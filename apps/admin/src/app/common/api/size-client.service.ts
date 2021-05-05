import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../app-config/app-config.token';
import { AppConfig } from '../../app-config/app.config';
import { HttpClient } from '@angular/common/http';
import { ApiSearchResponse } from '../models/api-search-response.model';
import { SizeModel } from '../../features/size/models/size.model';

@Injectable({
  providedIn: 'root',
})
export class SizeClientService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  findAll(params: any) {
    return this.http.get<ApiSearchResponse<SizeModel>>(
      `${this.appConfig.baseURL}/size`,
      { params }
    );
  }

  create(size: SizeModel) {
    return this.http.post<SizeModel>(`${this.appConfig.baseURL}/size`, size);
  }

  update(id: number, size: SizeModel) {
    return this.http.patch<SizeModel>(
      `${this.appConfig.baseURL}/size/${id}`,
      size
    );
  }

  delete(id: number) {
    return this.http.delete<SizeModel>(`${this.appConfig.baseURL}/size/${id}`);
  }
}
