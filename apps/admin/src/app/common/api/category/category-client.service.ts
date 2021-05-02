import { AppConfig } from './../../../app-config/app.config';
import { APP_CONFIG } from './../../../app-config/app-config.token';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryClient {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient
  ) {}

  findAll() {
    return this.http.get<any>(`${this.appConfig.baseURL}/category`, {});
  }
}
