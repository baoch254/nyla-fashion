import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'nl-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  @Output() toggleMenuEvent = new EventEmitter<boolean>();

  items: MenuItem[] = [
    {
      label: 'Welcome',
      icon: 'pi pi-fw pi-user-plus',
      routerLink: '/welcome',
    },
  ];
}
