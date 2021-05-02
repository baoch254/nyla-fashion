import { ROUTE_KEY } from './route-keys';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'nl-breadcrumb',
  template: '<p-breadcrumb [model]="items" [home]="home"></p-breadcrumb>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  items!: MenuItem[];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  private _keys!: string[];

  get keys(): string[] {
    return this._keys;
  }

  @Input() set keys(value: string[]) {
    this._keys = value;
    this.items = this.keys?.map<MenuItem>((key: string) => {
      return ROUTE_KEY[key];
    });
  }
}
