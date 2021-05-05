import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ProductModel } from '../../common/models/product.model';
import { ProductClientService } from '../../common/api/product-client.service';

@Component({
  selector: 'nl-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  filterOpened = true;
  rangePrices: number[] = [100, 500];
  minMaxPrices: number[] = [0, 1000];
  products!: ProductModel[];
  totalRecords = 1;

  constructor(
    private cd: ChangeDetectorRef,
    private productClient: ProductClientService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(page = 0): void {
    this.productClient
      .findAll({ take: 12, skip: 12 * page })
      .subscribe((data) => {
        this.products = data.results;
        this.totalRecords = data.totalRecords;
        this.cd.detectChanges();
      });
  }

  onToggleFilter(): void {
    this.filterOpened = !this.filterOpened;
  }

  onChangePage(page: any): void {
    this.fetchData(page.page);
  }
}
