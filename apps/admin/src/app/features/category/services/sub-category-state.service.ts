import { Injectable } from '@angular/core';
import { SubCategoryClientService } from '../../../common/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubCategoryModel } from '../models/sub-category.model';

@Injectable()
export class SubCategoryStateService {
  constructor(private subCategoryClient: SubCategoryClientService) {}

  private readonly _subCategorySub: BehaviorSubject<
    SubCategoryModel[]
  > = new BehaviorSubject<SubCategoryModel[]>([]);

  readonly subCategories$: Observable<
    SubCategoryModel[]
  > = this._subCategorySub.asObservable();

  private readonly _totalRecordsSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  readonly totalRecords$: Observable<number> = this._totalRecordsSub.asObservable();

  private _categoryId = 1;
  private pagination = { take: 10, skip: 0, categoryId: 1 };

  findAll(page?: number): void {
    if (page != null && page >= 0) {
      this.pagination.skip = this.pagination.take * page;
    }

    this.subCategoryClient.findAll(this.pagination).subscribe((data) => {
      this._subCategorySub.next(data.results);
      this._totalRecordsSub.next(data.totalRecords);
    });
  }

  create(subCategory: SubCategoryModel): void {
    subCategory.categoryId = this.categoryId;
    this.subCategoryClient.create(subCategory).subscribe(() => this.findAll());
  }

  update(subCategory: SubCategoryModel): void {
    const { id } = subCategory;
    if (!id) {
      return;
    }
    this.subCategoryClient
      .update(id, subCategory)
      .subscribe(() => this.findAll());
  }

  delete(subCategory: SubCategoryModel): void {
    const { id } = subCategory;
    if (!id) {
      return;
    }
    this.subCategoryClient.delete(id).subscribe(() => this.findAll());
  }

  set categoryId(value: number) {
    this._categoryId = value;
    this.pagination.categoryId = this._categoryId;
  }

  get categoryId(): number {
    return this._categoryId;
  }
}
