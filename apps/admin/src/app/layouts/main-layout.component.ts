import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'nl-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  isShowMenu = false;

  toggleMenu(): void {
    this.isShowMenu = !this.isShowMenu;
  }
}
