import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'nl-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  @Input() itemList: ProductModel[] = [];
  @Input() dataKey = 'id';
  @Input() editMode = 'row';

  editingRowKeys: { [s: string]: boolean } = {};

  @Output() viewEvent = new EventEmitter<ProductModel>();
  @Output() editSaveEvent = new EventEmitter<ProductModel>();
  private clonedItems: { [s: string]: ProductModel } = {};

  onRowEditSave(item: ProductModel): void {
    const itemKey = item.id + '';
    if (item.id !== -1) {
      delete this.clonedItems[itemKey];
    }
    this.editSaveEvent.emit(item);
  }

  onRowEditInit(item: ProductModel): void {
    const itemKey = item.id + '';
    this.clonedItems[itemKey] = {
      ...item,
    };
  }

  onRowEditCancel(item: ProductModel, index: number): void {
    const itemKey = item.id + '';

    if (item.id === -1) {
      this.itemList = this.itemList.filter((el) => el.id !== -1);
      return;
    }

    this.itemList[index] = this.clonedItems[itemKey];
    delete this.clonedItems[itemKey];
  }

  onView(item: ProductModel): void {
    this.viewEvent.emit(item);
  }
}
