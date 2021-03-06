import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nl-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  displayCart = false;

  onToggleCart(): void {
    this.displayCart = !this.displayCart;
  }
}
