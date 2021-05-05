import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryStateService } from './services/category-state.service';
import { CategoryModel } from './models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nl-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit {
  categories$ = this.categoryState.categories$;
  totalRecords!: number;

  readonly routeKeys = ['Category'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryState: CategoryStateService
  ) {}

  ngOnInit(): void {
    this.categoryState.findAll();
    this.categoryState.totalRecords$.subscribe(
      (data) => (this.totalRecords = data)
    );
  }

  onSaveCategory(category: CategoryModel): void {
    if (category.id === -1) {
      this.categoryState.create(category);
      return;
    }
    this.categoryState.update(category);
  }

  onChangePage(pPage: any): void {
    const { page } = pPage;

    this.categoryState.findAll(page);
  }

  onViewCategory(category: CategoryModel): void {
    this.router.navigate([category.id], { relativeTo: this.route });
  }

  onDelete(category: CategoryModel): void {
    this.categoryState.delete(category);
  }
}
