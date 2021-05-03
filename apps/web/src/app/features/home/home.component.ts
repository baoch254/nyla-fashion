import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

declare const Flickity: any;

@Component({
  selector: 'nl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
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
