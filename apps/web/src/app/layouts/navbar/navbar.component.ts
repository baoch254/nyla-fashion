import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuMobileOpened = false;

  onToggleMenuMobile(): void {
    this.menuMobileOpened = !this.menuMobileOpened;
  }
}
