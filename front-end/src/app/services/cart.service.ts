import { HostListener, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CartItem } from "../models/cart-item";
import { Product } from "../models/product";
import {
  cartUrl,
  updateQtyUrl,
  updateDeliveryUrl,
  getUrlToReturnProduct,
} from "../config/api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsListener = new Subject<CartItem[]>();
  private deliveryType = 1;

  constructor(private http: HttpClient) {
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

  // initCartItems(cartItems: any): void {
  //   // console.log('SSSSSSSSSSSSSSSSSSSSS',cartItems);
  //   const productsArr = cartItems.productsArr;
  //   const qtyArr = cartItems.qty;

  //   for (let i = 0; i < productsArr.length; i++) {
  //     this.cartItems.push(new CartItem(productsArr[i], qtyArr[i]));
  //   }

  //   this.deliveryType = cartItems.delivery_option === "delivery" ? 2 : 1;
  //   this.cartItemsListener.next(this.cartItems);
  // }

  getCartItems(): CartItem[] {
    this.loadCartItems();
    return this.cartItems;
  }

  loadCartItems(): void {
    this.http.get(cartUrl).subscribe((cartItems: any) => {
      this.initCartItems(cartItems.productsArr, cartItems.qty, cartItems.delivery_option);
      this.cartItemsListener.next(this.cartItems);
    });
  }
  initCartItems(productsArr: any[], qtyArr: number[], delivery_option: string): void {
    let cart: CartItem[] = [];
    // console.log(productsArr);
    for (let i = 0; i < productsArr.length; i++) {
      cart.push(new CartItem(productsArr[i], qtyArr[i]));
    }
    this.deliveryType = delivery_option === "delivery" ? 2 : 1;

    this.cartItems = [...cart];
  }

  addProductToCart(product: Product): void {
    let isExists = false;
    let currQty = 0;

    for (let cartItem of this.cartItems) {
      if (cartItem.product.product_id === product.product_id) {
        isExists = true;
        currQty = cartItem.qty;

        break;
      }
    }

    if (!isExists) {
      this.addProductToDB(product.product_id, 1);
    } else {
      this.updateQtyInDB(product.product_id, currQty + 1);
    }

    // this.cartItemsListener.next(this.cartItems);
  }

  updateQtyInDB(product_id: number, qty: number): void {
    this.http
      .put(updateQtyUrl, {
        product_id,
        qty,
      })
      .subscribe(() => {
        this.loadCartItems();
      });
  }

  addProductToDB(product_id: number, qty: number): void {
    this.http
      .post(cartUrl, {
        product_id,
        qty,
      })
      .subscribe(() => {
        this.loadCartItems();
      });
  }

  removeProductFromCart(product: Product): void {
    // this.cartItems = this.cartItems.filter(
    //   (cartItem: CartItem) => cartItem.product !== product
    // );
    // this.cartItemsListener.next(this.cartItems);
    this.http.delete(getUrlToReturnProduct(product)).subscribe(() => {
      this.loadCartItems();
    });
  }

  listenCartItems(): Observable<CartItem[]> {
    return this.cartItemsListener.asObservable();
  }

  emptyCart(): void {
    // this.cartItems = [];
    // this.cartItemsListener.next(this.cartItems);
    this.http.delete(cartUrl).subscribe(() => {
      this.loadCartItems();
    });
  }

  calcCartTotal(): void {
    this.cartItemsListener.next(this.cartItems);
  }

  setDeliveryOption(deliveryIdentify: number): void {
    let delivery_option = deliveryIdentify == 2 ? "delivery" : "take-away";
    this.http.put(updateDeliveryUrl, { delivery_option }).subscribe(() => {
      this.loadCartItems();
    });
  }

  getDeliveryOption(): number {
    return this.deliveryType;
  }
}
