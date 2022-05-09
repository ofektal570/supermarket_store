import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PurchasedCart } from "../models/purchased-cart";
import { PurchasedProduct } from "../models/purchased-product";

@Injectable({
  providedIn: "root",
})
export class PurchasedCartService {
  private purchasedCartsListener = new Subject<PurchasedCart[]>();
  private purchasedCarts: PurchasedCart[] = [];

  constructor() {}

  addPurchasedCart(
    purchasedProducts: PurchasedProduct[],
    totalPrice: number,
    delivery: number
  ): void {
    this.purchasedCarts.push(new PurchasedCart(purchasedProducts, totalPrice, delivery));
    this.purchasedCartsListener.next(this.purchasedCarts);
  }

  getPurchasedCarts() {
    return this.purchasedCarts;
  }

  listenPurchasedCarts(): Observable<PurchasedCart[]> {
    return this.purchasedCartsListener.asObservable();
  }
}
