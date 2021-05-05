import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductClientService } from '../../common/api/product-client.service';
import { ProductModel } from '../../common/models/product.model';

declare const Flickity: any;

@Component({
  selector: 'nl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  products!: ProductModel[];

  constructor(
    private cd: ChangeDetectorRef,
    private productClient: ProductClientService
  ) {}

  ngOnInit(): void {
    this.productClient.findAll({ take: 8, skip: 0 }).subscribe((data) => {
      this.products = data.results;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    const elem = document.querySelector('.main-carousel');
    const flkty = new Flickity(elem, {
      // options
      cellAlign: 'left',
      contain: true,
      draggable: true,
      pageDots: false,
      autoPlay: true,
      adaptiveHeight: true,
      bgLazyLoad: true,
    });
  }
}
