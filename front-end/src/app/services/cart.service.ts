import { HostListener, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartItem } from "../models/cart-item";
import { Product } from "../models/product";
import { cartUrl } from "../config/api";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsListener = new Subject<CartItem[]>();
  private deliveryType = 1;

  constructor() {
    // this.http.get(cartUrl).subscribe((cartItems) => {
    //   this.initCartItems(cartItems);
    // });
  }

  // saveCart() {
  //   let productsIdArr: number[] = [];
  //   let qtyArr: number[] = [];
  //   let deliveryOption = this.deliveryType == 2 ? 'delivery' : 'take-away';

  //   this.cartItems.forEach((cartItem) => {
  //     productsIdArr.push(cartItem.product.product_id);
  //     qtyArr.push(cartItem.qty);
  //   });

  //   this.http
  //     .put(cartUrl, {
  //       product_id: productsIdArr,
  //       qty: qtyArr,
  //       delivery_option: deliveryOption,
  //     })
  //     .subscribe((cartItems) => {
  //       console.log("did it");
  //     });
  // }

  initCartItems(cartItems: any): void {
    // console.log('SSSSSSSSSSSSSSSSSSSSS',cartItems);
    const productsArr = cartItems.productsArr;
    const qtyArr = cartItems.qty;

    for (let i = 0; i < productsArr.length; i++) {
      this.cartItems.push(new CartItem(productsArr[i], qtyArr[i]));
    }

    this.deliveryType = cartItems.delivery_option === "delivery" ? 2 : 1;
    this.cartItemsListener.next(this.cartItems);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addProductToCart(product: Product): void {
    let isExists = false;
    for (let cartItem of this.cartItems) {
      if (cartItem.product === product) {
        isExists = true;
        cartItem.qty++;
        break;
      }
    }
    if (!isExists) {
      this.cartItems.push(new CartItem(product));
    }

    this.cartItemsListener.next(this.cartItems);
  }

  removeProductFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItem) => cartItem.product !== product
    );
    this.cartItemsListener.next(this.cartItems);
  }

  listenCartItems(): Observable<CartItem[]> {
    return this.cartItemsListener.asObservable();
  }

  emptyCart(): void {
    this.cartItems = [];
    this.cartItemsListener.next(this.cartItems);
  }

  calcCartTotal(): void {
    this.cartItemsListener.next(this.cartItems);
  }

  setDeliveryOption(delivery_option: number): void {
    this.deliveryType = delivery_option;
  }

  getDeliveryOption(): number {
    return this.deliveryType;
  }
}
