import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SizeClientService } from '../../../common/api/size-client.service';
import { SizeModel } from '../models/size.model';

@Injectable()
export class SizeStateService {
  constructor(private sizeClient: SizeClientService) {}

  private readonly _sizeSub: BehaviorSubject<SizeModel[]> = new BehaviorSubject<
    SizeModel[]
  >([]);

  readonly sizes$: Observable<SizeModel[]> = this._sizeSub.asObservable();

  private readonly _totalRecordsSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  readonly totalRecords$: Observable<number> = this._totalRecordsSub.asObservable();

  private pagination = { take: 10, skip: 0 };

  findAll(page?: number): void {
    if (page != null && page >= 0) {
      this.pagination.skip = this.pagination.take * page;
    }

    this.sizeClient.findAll(this.pagination).subscribe((data) => {
      this._sizeSub.next(data.results);
      this._totalRecordsSub.next(data.totalRecords);
    });
  }

  create(size: SizeModel): void {
    this.sizeClient.create(size).subscribe(() => this.findAll());
  }

  update(size: SizeModel): void {
    const { id } = size;
    if (!id) {
      return;
    }
    this.sizeClient.update(id, size).subscribe(() => this.findAll());
  }

  delete(size: SizeModel): void {
    const { id } = size;
    if (!id) {
      return;
    }
    this.sizeClient.delete(id).subscribe(() => this.findAll());
  }
}
