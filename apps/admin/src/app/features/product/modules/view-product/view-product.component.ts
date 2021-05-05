import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { Observable } from 'rxjs';
import {
  AddProductStateService,
  IRelatedProduct,
} from '../../services/add-product-state.service';
import { CategoryModel } from '../../../category/models/category.model';
import { SubCategoryModel } from '../../../category/models/sub-category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailModel } from '../../models/product-detail.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'nl-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
  providers: [AddProductStateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProductComponent implements OnInit {
  readonly routeKeys = ['Product', 'ViewProduct'];

  product!: ProductModel;

  vm$!: Observable<IRelatedProduct>;
  categorySelected!: CategoryModel;
  subCategorySelecting: SubCategoryModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private productState: AddProductStateService
  ) {}

  ngOnInit(): void {
    let { id } = this.route.snapshot.params;
    id = +id;
    if (isNaN(id) && id < 0) {
      this.router.navigateByUrl('/');
      return;
    }

    this.productState.findOne(id);
    this.productState.product$.subscribe((data) => {
      this.product = data;
      console.log(this.product);
      this.cd.detectChanges();
    });

    this.vm$ = this.productState.fetchData().pipe(
      tap((data) => {
        setTimeout(() => {
          // Mapping category
          const categoryIndex = data.categories.findIndex((category) => {
            if (!category.subCategories?.length) {
              return false;
            }

            for (const subCate of category.subCategories) {
              if (subCate.id === this.product.categoryId) {
                return true;
              }
            }
            return false;
          });

          this.categorySelected = data.categories[categoryIndex];
          this.subCategorySelecting = data.categories[categoryIndex]
            .subCategories as SubCategoryModel[];
          this.cd.detectChanges();
        }, 0);
      })
    );
  }

  onUpdateProduct(): void {
    const id = this.product.id as number;
    this.productState.updateProduct(id, this.product);
  }

  onSaveProductDetail(productDetail: ProductDetailModel): void {
    const { id } = productDetail;

    productDetail.productId = this.product.id;

    if (id == null || id === -1) {
      this.productState.createProductDetail(productDetail);
      return;
    }

    this.productState.updateProductDetail(id, productDetail);
  }

  onDeleteProductDetail(productDetail: ProductDetailModel): void {
    const { id } = productDetail;
    if (id == null || id < 0) {
      return;
    }

    this.productState.deleteProductDetail(id);
  }

  onChooseCategory(event: any): void {
    const category = event.value;
    this.subCategorySelecting = category.subCategories;
  }

  async onUploadImage(upload: any) {
    this.productState.createProductDetailImage(upload.id, upload.files[0]);

    const data64 = (await this.toBast64(upload.files[0])) as string;
  }

  toBast64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
