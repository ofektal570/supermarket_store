import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { PurchasedCart } from "../models/purchased-cart";
import { PurchasedProduct } from "../models/purchased-product";
import { ordersUrl } from "../config/api";

@Injectable({
  providedIn: "root",
})
export class PurchasedCartService {
  private purchasedCartsListener = new Subject<PurchasedCart[]>();
  private purchasedCarts: PurchasedCart[] = [];

  constructor(private http: HttpClient) {}
  // const { product_name, qty, total_price, delivery_option } = req.body;
  addPurchasedCart(
    purchasedProducts: PurchasedProduct[],
    totalPrice: number,
    delivery: number
  ): void {
    let order = new PurchasedCart(purchasedProducts, totalPrice, delivery);
    let productNames: string[] = [];
    let productsQty: number[] = [];
    let productsPrices: number[] = [];
    
    order.purchasedProducts.forEach((purchasedProducts: PurchasedProduct) => {
      productNames.push(purchasedProducts.product_name);
      productsQty.push(purchasedProducts.qty);
      productsPrices.push(purchasedProducts.price);
    });

    this.purchasedCarts.push(order);
    this.purchasedCartsListener.next(this.purchasedCarts);

    this.http
      .post(ordersUrl, {
        product_name: productNames,
        qty: productsQty,
        total_price: productsPrices,
        delivery_option: delivery,
      })
      .subscribe(() => {
        console.log("posted!");
      });
  }

  loadPurchasedCarts() {
    // return this.purchasedCarts;
    this.http.get(ordersUrl).subscribe((orders: any) => {
      this.initPurchasedCarts(orders.ordersArr);
      this.purchasedCartsListener.next(this.purchasedCarts);
    });
  }

  initPurchasedCarts(ordersArr: any[]) {
    let purchasedCarts: PurchasedCart[] = [];

    ordersArr.forEach((order) => {
      let purchasedProducts: PurchasedProduct[] = [];
      // let productNames: string[] = [];
      // let productsQty: number[] = [];
      // let productsPrices: number[] = [];
      for (let i = 0; i < order.qty.length; i++) {
        // productNames.push(order.productName);
        // productsQty.push(order.qty);
        // productsPrices.push(order.price);

        purchasedProducts.push(
          new PurchasedProduct(
            order.product_name[i],
            order.qty[i],
            parseFloat(order.total_price[i])
          )
        );
      }

      purchasedCarts.push(
        new PurchasedCart(
          purchasedProducts,
          this.calcTotal(purchasedProducts, order.delivery_option),
          // parseFloat(order.total_price),
          order.delivery_option
        )
      );
      this.purchasedCarts = [...purchasedCarts];
    });

    return purchasedCarts;
  }

  listenPurchasedCarts(): Observable<PurchasedCart[]> {
    return this.purchasedCartsListener.asObservable();
  }
  
  calcTotal(purchasedProducts: PurchasedProduct[], delivery_option: string): number {
    let totalPrice = delivery_option === '2' ? 5 : 0;
    for (let product of purchasedProducts) {
      totalPrice += (product.price * product.qty);
    }
    return totalPrice;
  }
}
