import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import {
  AddProductStateService,
  IRelatedProduct,
} from '../../services/add-product-state.service';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../../category/models/category.model';
import { SubCategoryModel } from '../../../category/models/sub-category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'nl-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [AddProductStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {
  readonly routeKeys = ['Product', 'AddProduct'];

  product!: ProductModel;

  vm$!: Observable<IRelatedProduct>;
  categorySelected!: CategoryModel;
  subCategorySelecting: SubCategoryModel[] = [];

  constructor(
    private router: Router,
    private addProductState: AddProductStateService
  ) {}

  ngOnInit(): void {
    this.vm$ = this.addProductState.fetchData();
    this.resetProduct();
  }

  resetProduct(): void {
    this.product = {
      price: 0,
    };
  }

  onCreateProduct(): void {
    this.addProductState.createProduct(this.product).subscribe((product) => {
      this.router.navigateByUrl('/product');
    });
  }

  onChooseCategory(event: any): void {
    const category = event.value;
    this.subCategorySelecting = category.subCategories;
  }
}
