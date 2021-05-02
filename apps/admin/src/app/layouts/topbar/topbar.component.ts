import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'nl-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  @Output() toggleMenuEvent = new EventEmitter<boolean>();
}
