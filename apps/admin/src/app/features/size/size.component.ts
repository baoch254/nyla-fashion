import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColorModel } from '../color/models/color.model';
import { SizeStateService } from './services/size-state.service';

@Component({
  selector: 'nl-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
  providers: [SizeStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeComponent implements OnInit {
  readonly routeKeys = ['Size'];

  totalRecords!: number;

  sizes$ = this.sizeState.sizes$;

  constructor(private sizeState: SizeStateService) {}

  ngOnInit(): void {
    this.sizeState.findAll();
    this.sizeState.totalRecords$.subscribe(
      (data) => (this.totalRecords = data)
    );
  }

  onSave(item: ColorModel): void {
    if (item.id === -1) {
      delete item.id;
      this.sizeState.create(item);
      return;
    }
    this.sizeState.update(item);
  }

  onDelete(item: ColorModel): void {
    this.sizeState.delete(item);
  }

  onChangePage(pPage: any): void {
    const { page } = pPage;

    this.sizeState.findAll(page);
  }
}
