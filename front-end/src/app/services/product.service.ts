import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";
import {
  productsUrl,
  getUrlToDeleteProduct,
  updatePriceUrl,
  updateAmountUrl,
  getUniqueIdUrl,
} from "../config/api";
import { HttpClient } from "@angular/common/http";
import { CartService } from "./cart.service";
import { ProductTrackingPricesService } from "./product-tracking-prices.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsListener = new Subject<Product[]>();
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private productTrackingPrices: ProductTrackingPricesService
  ) {}

  loadProducts(): Product[] {
    this.http.get(productsUrl).subscribe((products) => {
      this.initProducts(products);
      this.products.sort((product1: Product, product2: Product) => {
        return product1.product_id - product2.product_id;
      });
      this.productsListener.next(this.products);
    });
    return this.products;
  }

  initProducts(products: any): void {
    this.products = [];

    products.forEach((product: any) => {
      this.products.push(
        new Product(
          product.name,
          product.prev_price,
          product.curr_price,
          product.amount,
          product.image_url,
          product.product_id
        )
      );
    });
  }

  listenProducts(): Observable<Product[]> {
    return this.productsListener.asObservable();
  }

  addProduct(product: Product): void {
    this.http.get(getUniqueIdUrl).subscribe((unique_id) => {
      this.http
        .post(productsUrl, {
          name: product.name,
          prev_price: product.prev_price,
          curr_price: product.curr_price,
          amount: product.amount,
          image_url: product.image_url,
          product_id: unique_id,
        })
        .subscribe(() => {
          this.loadProducts();
        });
    });
  }

  deleteProduct(productToDelete: Product): void {
    this.http.delete(getUrlToDeleteProduct(productToDelete)).subscribe(() => {
      this.loadProducts();
    });
    this.cartService.removeProductFromCart(productToDelete);
    this.productTrackingPrices.deleteProductTracking(productToDelete);
  }

  getNumOfProducts(): number {
    return this.products.length;
  }

  updateProductPrice(product: Product, newPrice: number) {
    this.http
      .put(updatePriceUrl, {
        product_id: product.product_id,
        new_price: newPrice,
      })
      .subscribe(() => {
        this.loadProducts();
      });
  }

  updateProductAmount(product: Product, newAmount: number): void {
    this.http
      .put(updateAmountUrl, {
        product_id: product.product_id,
        new_amount: newAmount,
      })
      .subscribe(() => {
        this.loadProducts();
      });
  }
}
