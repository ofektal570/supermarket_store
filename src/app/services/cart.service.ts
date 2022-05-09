import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsListener = new Subject<CartItem[]>();

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addProductToCart(product: Product) {
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

  removeProductFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItem) => cartItem.product !== product
    );
    this.cartItemsListener.next(this.cartItems);
  }

  listenCartItems(): Observable<CartItem[]> {
    return this.cartItemsListener.asObservable();
  }

  emptyCart() {
    this.cartItems = [];
    this.cartItemsListener.next(this.cartItems);
  }
  
  calcCartTotal() {
    this.cartItemsListener.next(this.cartItems);
  }
  // amountOfProduct(product: Product): number {
  //   for (let cartItem of this.cartItems) {
  //     if (cartItem.product === product) {
  //       return cartItem.qty;
  //     }
  //   }

  //   return 0;
  // }
}
