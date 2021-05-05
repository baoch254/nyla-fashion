import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'nl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuMobileOpened = false;

  @Output() openCartEvent = new EventEmitter<boolean>();

  onToggleMenuMobile(): void {
    this.menuMobileOpened = !this.menuMobileOpened;
  }
}
