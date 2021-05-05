import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductStateService } from './services/product-state.service';
import { ProductModel } from './models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nl-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  readonly routeKeys = ['Product'];

  products$ = this.productState.products$;
  totalRecords!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productState: ProductStateService
  ) {}

  ngOnInit(): void {
    this.productState.findAll();
    this.productState.totalRecords$.subscribe(
      (data) => (this.totalRecords = data)
    );
  }

  onSave(item: ProductModel): void {
    if (item.id === -1) {
      delete item.id;
      this.productState.create(item);
      return;
    }
    this.productState.update(item);
  }

  onChangePage(pPage: any): void {
    const { page } = pPage;

    this.productState.findAll(page);
  }

  onView(item: ProductModel): void {
    this.router.navigate([item.id], { relativeTo: this.route });
  }
}
