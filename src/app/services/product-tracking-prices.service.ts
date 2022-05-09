import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";
import { ProductTrackingPrices } from "../models/product-tracking-prices";

@Injectable({
  providedIn: "root",
})
export class ProductTrackingPricesService {
  private productsTrackingPricesListener = new Subject<ProductTrackingPrices[]>();
  private productsTrackingPrices: ProductTrackingPrices[] = [];

  constructor() {}

  getProductsTrackingPrices(): ProductTrackingPrices[] {
    return this.productsTrackingPrices;
  }

  updateProductPrices(product: Product): void {
    let isExist = false;

    for (let productTracking of this.productsTrackingPrices) {
      if (productTracking.product === product) {
        productTracking.addNewTracking(product.prev_price, product.curr_price);
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      this.productsTrackingPrices.push(new ProductTrackingPrices(product));
    }
    this.productsTrackingPricesListener.next(this.productsTrackingPrices);
  }

  listenProductTrackingPrices(): Observable<ProductTrackingPrices[]> {
    return this.productsTrackingPricesListener.asObservable();
  }
}
