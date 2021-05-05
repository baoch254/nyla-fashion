import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductDetailModel } from '../../common/models/product-detail.model';
import { ProductClientService } from '../../common/api/product-client.service';

export interface ICartProduct {
  detail: ProductDetailModel;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  constructor(private productClient: ProductClientService) {}

  private _cartItemsSub = new BehaviorSubject<ICartProduct[]>([]);

  cartItems$ = this._cartItemsSub.asObservable();

  addToCart(detail: ProductDetailModel, quantity: number): void {
    const { id } = detail;
    if (!id || quantity < 0) {
      return;
    }

    this.productClient.findOneDetail(id).subscribe((data) => {
      const cart = this._cartItemsSub.getValue();
      cart.push({
        detail: data,
        quantity: quantity,
      });

      this._cartItemsSub.next([...cart]);
    });
  }
}
