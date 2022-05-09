import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { PurchasedCart } from '../models/purchased-cart';
import { PurchasedProduct } from '../models/purchased-product';

@Injectable({
  providedIn: 'root',
})
export class PurchasedCartService {
  private purchasedCartsListener = new Subject<PurchasedCart[]>();
  private purchasedCarts: PurchasedCart[] = [];

  constructor() {}

  addPurchasedCart(
    purchasedProducts: PurchasedProduct[],
    totalPrice: number
  ): void {
    this.purchasedCarts.push(new PurchasedCart(purchasedProducts, totalPrice));
    this.purchasedCartsListener.next(this.purchasedCarts);
  }

  getPurchasedCarts() {
    return this.purchasedCarts;
  }

  listenPurchasedCarts(): Observable<PurchasedCart[]> {
    return this.purchasedCartsListener.asObservable();
  }
}
