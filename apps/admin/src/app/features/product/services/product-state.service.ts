import { Injectable } from '@angular/core';
import { ProductClientService } from '../../../common/api/product/product-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductStateService {
  constructor(private productClient: ProductClientService) {}

  private readonly _productSub: BehaviorSubject<
    ProductModel[]
  > = new BehaviorSubject<ProductModel[]>([]);

  readonly products$: Observable<
    ProductModel[]
  > = this._productSub.asObservable();

  private readonly _totalRecordsSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  readonly totalRecords$: Observable<number> = this._totalRecordsSub.asObservable();

  private pagination = { take: 10, skip: 0 };

  findAll(page?: number): void {
    if (page != null && page >= 0) {
      this.pagination.skip = this.pagination.take * page;
    }

    this.productClient.findAll(this.pagination).subscribe((data) => {
      this._productSub.next(data.results);
      this._totalRecordsSub.next(data.totalRecords);
    });
  }

  create(product: ProductModel): void {
    this.productClient.create(product).subscribe(() => this.findAll());
  }

  update(product: ProductModel): void {
    const { id } = product;
    if (!id) {
      return;
    }
    this.productClient.update(id, product).subscribe(() => this.findAll());
  }
}
