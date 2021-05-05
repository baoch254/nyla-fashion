import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SizeModel } from '../../models/size.model';

@Component({
  selector: 'nl-size-table',
  templateUrl: './size-table.component.html',
  styleUrls: ['./size-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizeTableComponent {
  @Input() itemList: SizeModel[] = [];
  @Input() dataKey = 'id';
  @Input() editMode = 'row';

  editingRowKeys: { [s: string]: boolean } = {};

  @Output() viewEvent = new EventEmitter<SizeModel>();
  @Output() deleteEvent = new EventEmitter<SizeModel>();
  @Output() editSaveEvent = new EventEmitter<SizeModel>();
  private clonedItems: { [s: string]: SizeModel } = {};

  onNewRow(): void {
    if (this.itemList[0]?.id === -1) {
      return;
    }
    this.itemList.unshift({ id: -1 });
    this.editingRowKeys['-1'] = true;
  }

  onRowDelete(item: SizeModel): void {
    this.deleteEvent.emit(item);
  }

  onRowEditSave(item: SizeModel): void {
    const itemKey = item.id + '';
    if (item.id !== -1) {
      delete this.clonedItems[itemKey];
    }
    this.editSaveEvent.emit(item);
  }

  onRowEditInit(item: SizeModel): void {
    const itemKey = item.id + '';
    this.clonedItems[itemKey] = {
      ...item,
    };
  }

  onRowEditCancel(item: SizeModel, index: number): void {
    const itemKey = item.id + '';

    if (item.id === -1) {
      this.itemList = this.itemList.filter((el) => el.id !== -1);
      return;
    }

    this.itemList[index] = this.clonedItems[itemKey];
    delete this.clonedItems[itemKey];
  }
}
