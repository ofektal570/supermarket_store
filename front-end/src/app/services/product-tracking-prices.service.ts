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

  // getProductsTrackingPrices(): ProductTrackingPrices[] {
  //   this.loadProductsTrackingPrices();

  //   return this.productsTrackingPrices;
  // }

  loadProductsTrackingPrices(): void {
    this.http.get(pricesUrl).subscribe((pricesSummary) => {
      this.initProductsTrackingPrices(pricesSummary);
    });
  }
  initProductsTrackingPrices(pricesSummary: any) {
    this.productsTrackingPrices = [];
    console.log(pricesSummary.names.length, pricesSummary);
    for (let i = 0; i < pricesSummary.names.length; i++) {
      this.productsTrackingPrices.push(
        new ProductTrackingPrices(pricesSummary.names[i], pricesSummary.prices[i])
      );
    }
    console.log('IN SERVICE!!!',this.productsTrackingPrices);
    this.productsTrackingPricesListener.next(this.productsTrackingPrices);
  }
  // const {product_id, prev_price, curr_price} = req.body;

  updateProductPrices(product_id: number, prev_price: number, curr_price: number): void {
    // for (let productTracking of this.productsTrackingPrices) {
    //   if (productTracking.product === product) {
    //     productTracking.addNewTracking(product.prev_price, product.curr_price);
    //     isExist = true;
    //     break;
    //   }
    // }
    // if (!isExist) {
    //   this.productsTrackingPrices.push(new ProductTrackingPrices(product));
    // }
    this.http
      .post(pricesUrl, {
        product_id,
        prev_price,
        curr_price
      })
      .subscribe(() => {
        this.loadProductsTrackingPrices();
      });
    // this.productsTrackingPricesListener.next(this.productsTrackingPrices);
  }

  listenProductTrackingPrices(): Observable<ProductTrackingPrices[]> {
    return this.productsTrackingPricesListener.asObservable();
  }
  
  deleteProductTracking(product: Product): void{
    this.http.delete(getUrlToRemoveTrackingProduct(product)).subscribe(() => {
      console.log('deleted');
    });
  }
}
