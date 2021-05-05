import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  CartStateService,
  ICartProduct,
} from '../../core-ui/cart/cart-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nl-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit {
  cartItems: ICartProduct[] = [];
  paymentOption = 'COD';

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
}
