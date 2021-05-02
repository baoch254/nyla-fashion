import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'nl-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isCollapsed = false;

  @Input() isShowMenu!: boolean;
}
