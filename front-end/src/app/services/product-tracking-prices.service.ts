import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";
import { ProductTrackingPrices } from "../models/product-tracking-prices";
import { getUrlToRemoveTrackingProduct, pricesUrl } from "../config/api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductTrackingPricesService {
  private productsTrackingPricesListener = new Subject<ProductTrackingPrices[]>();
  private productsTrackingPrices: ProductTrackingPrices[] = [];

  constructor(private http: HttpClient) {}

  loadProductsTrackingPrices(): void {
    this.http.get(pricesUrl).subscribe((pricesSummary) => {
      this.initProductsTrackingPrices(pricesSummary);
    });
  }
  initProductsTrackingPrices(pricesSummary: any) {
    this.productsTrackingPrices = [];
    for (let i = 0; i < pricesSummary.names.length; i++) {
      this.productsTrackingPrices.push(
        new ProductTrackingPrices(pricesSummary.names[i], pricesSummary.prices[i])
      );
    }
    this.productsTrackingPricesListener.next(this.productsTrackingPrices);
  }

  updateProductPrices(product_id: number, prev_price: number, curr_price: number): void {
    this.http
      .post(pricesUrl, {
        product_id,
        prev_price,
        curr_price,
      })
      .subscribe(() => {
        this.loadProductsTrackingPrices();
      });
  }

  listenProductTrackingPrices(): Observable<ProductTrackingPrices[]> {
    return this.productsTrackingPricesListener.asObservable();
  }

  deleteProductTracking(product: Product): void {
    this.http.delete(getUrlToRemoveTrackingProduct(product)).subscribe(() => {
              this.loadProductsTrackingPrices();

    });
  }

  clearProductTrackingDb() {
    this.http.delete(pricesUrl).subscribe(() => {
              this.loadProductsTrackingPrices();

    });
  }
}
