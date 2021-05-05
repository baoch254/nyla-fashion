import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'nl-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTableComponent {
  @Input() categories: CategoryModel[] = [];
  @Input() dataKey = 'id';
  @Input() editMode = 'row';

  editingRowKeys: { [s: string]: boolean } = {};

  @Output() viewEvent = new EventEmitter<CategoryModel>();
  @Output() deleteEvent = new EventEmitter<CategoryModel>();
  @Output() editSaveEvent = new EventEmitter<CategoryModel>();
  private clonedItems: { [s: string]: CategoryModel } = {};

  onNewRow(): void {
    if (this.categories[0]?.id === -1) {
      return;
    }
    this.categories.unshift({ id: -1 });
    this.editingRowKeys['-1'] = true;
  }

  onRowEditSave(category: CategoryModel): void {
    const itemKey = category.id + '';
    if (category.id !== -1) {
      delete this.clonedItems[itemKey];
    }
    this.editSaveEvent.emit(category);
  }

  onRowEditInit(category: CategoryModel): void {
    const itemKey = category.id + '';
    this.clonedItems[itemKey] = {
      ...category,
    };
  }

  onRowEditCancel(category: CategoryModel, index: number): void {
    const itemKey = category.id + '';

    if (category.id === -1) {
      this.categories = this.categories.filter(
        (category) => category.id !== -1
      );
      return;
    }

    this.categories[index] = this.clonedItems[itemKey];
    delete this.clonedItems[itemKey];
  }

  onRowDelete(item: CategoryModel): void {
    this.deleteEvent.emit(item);
  }

  onView(category: CategoryModel): void {
    this.viewEvent.emit(category);
  }
}
