import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { CategoryClient } from '../../../common/api';

@Injectable()
export class CategoryStateService {
  constructor(private categoryClient: CategoryClient) {}

  private readonly _categorySub: BehaviorSubject<
    CategoryModel[]
  > = new BehaviorSubject<CategoryModel[]>([]);

  readonly categories$: Observable<
    CategoryModel[]
  > = this._categorySub.asObservable();

  private readonly _totalRecordsSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  readonly totalRecords$: Observable<number> = this._totalRecordsSub.asObservable();

  private pagination = { take: 10, skip: 0 };

  findAll(page?: number): void {
    if (page != null && page >= 0) {
      this.pagination.skip = this.pagination.take * page;
    }

    this.categoryClient.findAll(this.pagination).subscribe((data) => {
      this._categorySub.next(data.results);
      this._totalRecordsSub.next(data.totalRecords);
    });
  }

  create(category: CategoryModel): void {
    this.categoryClient.create(category).subscribe(() => this.findAll());
  }

  update(category: CategoryModel): void {
    const { id } = category;
    if (!id) {
      return;
    }
    this.categoryClient.update(id, category).subscribe(() => this.findAll());
  }

  delete(category: CategoryModel): void {
    const { id } = category;
    if (!id) {
      return;
    }
    this.categoryClient.delete(id).subscribe(() => this.findAll());
  }
}
