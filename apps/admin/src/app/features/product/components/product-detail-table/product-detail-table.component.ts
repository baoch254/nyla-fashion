import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProductDetailModel } from '../../models/product-detail.model';
import { IRelatedProduct } from '../../services/add-product-state.service';

@Component({
  selector: 'nl-product-detail-table',
  templateUrl: './product-detail-table.component.html',
  styleUrls: ['./product-detail-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailTableComponent {
  @Input() itemList!: ProductDetailModel[] | any;
  @Input() dataKey = 'id';
  @Input() editMode = 'row';
  @Input() vm!: IRelatedProduct;

  editingRowKeys: { [s: string]: boolean } = {};

  @Output() viewEvent = new EventEmitter<ProductDetailModel>();
  @Output() deleteEvent = new EventEmitter<ProductDetailModel>();
  @Output() editSaveEvent = new EventEmitter<ProductDetailModel>();
  @Output() uploadDetailImage = new EventEmitter<any>();
  private clonedItems: { [s: string]: ProductDetailModel } = {};

  onNewRow(): void {
    if (this.itemList[0]?.id === -1) {
      return;
    }
    this.itemList.unshift({ id: -1, price: 0, stock: 0 });
    this.editingRowKeys['-1'] = true;
  }

  onRowDelete(item: ProductDetailModel): void {
    this.deleteEvent.emit(item);
  }

  onRowEditSave(item: ProductDetailModel): void {
    const itemKey = item.id + '';
    if (item.id !== -1) {
      delete this.clonedItems[itemKey];
    }
    this.editSaveEvent.emit(item);
  }

  onRowEditInit(item: ProductDetailModel): void {
    const itemKey = item.id + '';
    this.clonedItems[itemKey] = {
      ...item,
    };
  }

  onRowEditCancel(item: ProductDetailModel, index: number): void {
    const itemKey = item.id + '';

    if (item.id === -1) {
      this.itemList = this.itemList.filter((el: any) => el.id !== -1);
      return;
    }

    this.itemList[index] = this.clonedItems[itemKey];
    delete this.clonedItems[itemKey];
  }

  onUpload(fileEvent: any, index: number): void {
    const { files } = fileEvent;
    this.uploadDetailImage.emit({ id: this.itemList[index].id, files });
  }
}
