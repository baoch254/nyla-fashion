import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoryStateService } from '../../services/sub-category-state.service';
import { SubCategoryModel } from '../../models/sub-category.model';

@Component({
  selector: 'nl-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [SubCategoryStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubCategoryComponent implements OnInit {
  readonly routeKeys = ['Category', 'SubCategory'];

  subCategories$ = this.subCategoryState.subCategories$;
  totalRecords!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subCategoryState: SubCategoryStateService
  ) {}

  ngOnInit(): void {
    let { categoryId } = this.route.snapshot.params;
    categoryId = +categoryId;
    if (isNaN(categoryId) && categoryId < -1) {
      this.router.navigate(['/']);
      return;
    }

    this.subCategoryState.categoryId = categoryId;
    this.subCategoryState.findAll();
    this.subCategoryState.totalRecords$.subscribe(
      (data) => (this.totalRecords = data)
    );
  }

  onSave(item: SubCategoryModel): void {
    if (item.id === -1) {
      delete item.id;
      this.subCategoryState.create(item);
      return;
    }
    this.subCategoryState.update(item);
  }

  onChangePage(pPage: any): void {
    const { page } = pPage;

    this.subCategoryState.findAll(page);
  }

  onDelete(item: SubCategoryModel): void {
    this.subCategoryState.delete(item);
  }
}
