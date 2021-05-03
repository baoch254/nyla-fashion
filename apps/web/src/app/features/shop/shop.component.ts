import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nl-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  filterOpened = true;

  onToggleFilter(): void {
    this.filterOpened = !this.filterOpened;
  }
}
