import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'nl-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  isShowMenu = false;

  items!: MenuItem[];
  home!: MenuItem;

  ngOnInit(): void {
    this.items = [
      { label: 'Computer' },
      { label: 'Notebook' },
      { label: 'Accessories' },
      { label: 'Backpacks' },
      { label: 'Item' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  toggleMenu(): void {
    this.isShowMenu = !this.isShowMenu;
  }
}
