import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductClientService } from '../../common/api/product-client.service';
import { ProductModel } from '../../common/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailModel } from '../../common/models/product-detail.model';
import { CartStateService } from '../../core-ui/cart/cart-state.service';

declare const Flickity: any;

@Component({
  selector: 'nl-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  relatedProducts!: ProductModel[];
  product!: ProductModel;
  images: string[] = [];
  colors: string[] = [];
  detailShowing!: ProductDetailModel[];

  detailSelected!: ProductDetailModel;
  quantitySelected = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productClient: ProductClientService,
    private cartState: CartStateService
  ) {}

  ngOnInit(): void {
    const { productSlug } = this.route.snapshot.params;
    this.productClient.findAll({ take: 4, skip: 0 }).subscribe((data) => {
      this.relatedProducts = data.results;
      this.cd.detectChanges();
    });

    if (!productSlug) {
      this.router.navigateByUrl('/');
      return;
    }

    this.productClient.findByName(productSlug).subscribe((data) => {
      this.product = data;
      this.getColors();

      if (this.product.details?.length) {
        for (const detail of this.product.details) {
          if (detail.images?.length) {
            for (const img of detail.images) {
              this.images.push(img.image as string);
            }
          }
        }
      }

      this.cd.detectChanges();

      setTimeout(() => {
        const carouselMain = document.querySelector('.carousel-main');
        const flkty = new Flickity(
          carouselMain,
          {
            // options
            cellAlign: 'left',
            contain: true,
            draggable: true,
            pageDots: false,
            autoPlay: true,
            bgLazyLoad: true,
          },
          0
        );
      });
    });
  }

  getColors(): void {
    this.product.details?.forEach((detail) => {
      if (!this.colors?.length) {
        const code = detail.color?.code as string;
        this.colors.push(code);
        return true;
      }

      for (const code of this.colors) {
        if (detail.color?.code === code) {
          return false;
        }
      }
      return true;
    });

    this.onChooseColor(this.colors[0]);
  }

  onChooseColor(code: string): void {
    this.detailShowing = this.product.details?.filter((detail) => {
      return detail?.color?.code === code;
    }) as ProductDetailModel[];
  }

  onSelectDetail(detail: ProductDetailModel): void {
    this.detailSelected = detail;
  }

  onAddToCart(): void {
    this.cartState.addToCart(this.detailSelected, this.quantitySelected);
  }

  onChangeQuantity(value: number): void {
    if (this.quantitySelected === 1 && value === -1) {
      return;
    }

    this.quantitySelected += value;
  }
}
