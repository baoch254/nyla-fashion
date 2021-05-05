import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColorStateService } from './services/color-state.service';
import { ColorModel } from './models/color.model';

@Component({
  selector: 'nl-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  providers: [ColorStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent implements OnInit {
  readonly routeKeys = ['Color'];
  totalRecords!: number;

  colors$ = this.colorState.colors$;

  constructor(private colorState: ColorStateService) {}

  ngOnInit(): void {
    this.colorState.findAll();
    this.colorState.totalRecords$.subscribe(
      (data) => (this.totalRecords = data)
    );
  }

  onSave(item: ColorModel): void {
    if (item.id === -1) {
      delete item.id;
      this.colorState.create(item);
      return;
    }
    this.colorState.update(item);
  }

  onDelete(item: ColorModel): void {
    this.colorState.delete(item);
  }

  onChangePage(pPage: any): void {
    const { page } = pPage;

    this.colorState.findAll(page);
  }
}
