import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColorModel } from '../../models/color.model';

@Component({
  selector: 'nl-color-table',
  templateUrl: './color-table.component.html',
  styleUrls: ['./color-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorTableComponent {
  @Input() itemList: ColorModel[] = [];
  @Input() dataKey = 'id';
  @Input() editMode = 'row';

  editingRowKeys: { [s: string]: boolean } = {};

  @Output() viewEvent = new EventEmitter<ColorModel>();
  @Output() deleteEvent = new EventEmitter<ColorModel>();
  @Output() editSaveEvent = new EventEmitter<ColorModel>();
  private clonedItems: { [s: string]: ColorModel } = {};

  onNewRow(): void {
    if (this.itemList[0]?.id === -1) {
      return;
    }
    this.itemList.unshift({ id: -1, code: '#000000' });
    this.editingRowKeys['-1'] = true;
  }

  onRowDelete(item: ColorModel): void {
    this.deleteEvent.emit(item);
  }

  onRowEditSave(item: ColorModel): void {
    const itemKey = item.id + '';
    if (item.id !== -1) {
      delete this.clonedItems[itemKey];
    }
    this.editSaveEvent.emit(item);
  }

  onRowEditInit(item: ColorModel): void {
    const itemKey = item.id + '';
    this.clonedItems[itemKey] = {
      ...item,
    };
  }

  onRowEditCancel(item: ColorModel, index: number): void {
    const itemKey = item.id + '';

    if (item.id === -1) {
      this.itemList = this.itemList.filter((el) => el.id !== -1);
      return;
    }

    this.itemList[index] = this.clonedItems[itemKey];
    delete this.clonedItems[itemKey];
  }
}
