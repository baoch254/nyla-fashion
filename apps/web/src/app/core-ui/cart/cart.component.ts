import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CartStateService, ICartProduct } from './cart-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nl-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  @Input() displayCart = false;

  cartItems: ICartProduct[] = [];

  @Output() hideCart = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private cartState: CartStateService
  ) {}

  ngOnInit(): void {
    this.cartState.cartItems$.subscribe((data) => {
      this.cartItems = data;
      this.cd.detectChanges();
    });
  }

  onNavigatePayment(): void {
    this.router.navigateByUrl('/payment');
    return;
  }
}
