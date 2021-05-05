import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ColorModel } from '../models/color.model';
import { ColorClientService } from '../../../common/api/color-client.service';

@Injectable()
export class ColorStateService {
  constructor(private colorClient: ColorClientService) {}

  private readonly _colorSub: BehaviorSubject<
    ColorModel[]
  > = new BehaviorSubject<ColorModel[]>([]);

  readonly colors$: Observable<ColorModel[]> = this._colorSub.asObservable();

  private readonly _totalRecordsSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  readonly totalRecords$: Observable<number> = this._totalRecordsSub.asObservable();

  private pagination = { take: 10, skip: 0 };

  findAll(page?: number): void {
    if (page != null && page >= 0) {
      this.pagination.skip = this.pagination.take * page;
    }

    this.colorClient.findAll(this.pagination).subscribe((data) => {
      this._colorSub.next(data.results);
      this._totalRecordsSub.next(data.totalRecords);
    });
  }

  create(color: ColorModel): void {
    this.colorClient.create(color).subscribe(() => this.findAll());
  }

  update(color: ColorModel): void {
    const { id } = color;
    if (!id) {
      return;
    }
    this.colorClient.update(id, color).subscribe(() => this.findAll());
  }

  delete(color: ColorModel): void {
    const { id } = color;
    if (!id) {
      return;
    }
    this.colorClient.delete(id).subscribe(() => this.findAll());
  }
}
