import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SubCategoryModel } from '../../models/sub-category.model';

@Component({
  selector: 'nl-sub-category-table',
  templateUrl: './sub-category-table.component.html',
  styleUrls: ['./sub-category-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubCategoryTableComponent {
  @Input() itemList: SubCategoryModel[] = [];
  @Input() dataKey = 'id';
  @Input() editMode = 'row';

  editingRowKeys: { [s: string]: boolean } = {};

  @Output() viewEvent = new EventEmitter<SubCategoryModel>();
  @Output() deleteEvent = new EventEmitter<SubCategoryModel>();
  @Output() editSaveEvent = new EventEmitter<SubCategoryModel>();
  private clonedItems: { [s: string]: SubCategoryModel } = {};

  onNewRow(): void {
    if (this.itemList[0]?.id === -1) {
      return;
    }
    this.itemList.unshift({ id: -1 });
    this.editingRowKeys['-1'] = true;
  }

  onRowEditSave(item: SubCategoryModel): void {
    const itemKey = item.id + '';
    if (item.id !== -1) {
      delete this.clonedItems[itemKey];
    }
    this.editSaveEvent.emit(item);
  }

  onRowEditInit(item: SubCategoryModel): void {
    const itemKey = item.id + '';
    this.clonedItems[itemKey] = {
      ...item,
    };
  }

  onRowEditCancel(item: SubCategoryModel, index: number): void {
    const itemKey = item.id + '';

    if (item.id === -1) {
      this.itemList = this.itemList.filter((el) => el.id !== -1);
      return;
    }

    this.itemList[index] = this.clonedItems[itemKey];
    delete this.clonedItems[itemKey];
  }

  onRowDelete(item: SubCategoryModel): void {
    this.deleteEvent.emit(item);
  }
}
