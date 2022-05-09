import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";
import { productsUrl, getUrlToDeleteProduct } from "../config/api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsListener = new Subject<Product>();
  private counterId = 4;
  private loaded = false;
  products: Product[] = [];

  constructor(private http: HttpClient) {
    console.log("im CSTOR yeah SERVICE");
    this.getProducts().subscribe((products) => {
      this.products = products;
      this.loaded = true;
      console.log("edit ", this.products.length);
    });
  }

  initProducts():Product[] {
    return this.products;
  }
  isInitialized() {
    return this.loaded;
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  listenProducts(): Observable<Product> {
    return this.productsListener.asObservable();
  }

  addProduct(product: Product): void {
    this.http
      .post(productsUrl, {
        name: product.name,
        prev_price: product.prev_price,
        curr_price: product.curr_price,
        amount: product.amount,
        image_url: product.image_url,
        product_id: product.product_id,
      })
      .subscribe(() => {
        this.productsListener.next(product);
      });
  }

  deleteProduct(productToDelete: Product): void {
    this.http.delete(getUrlToDeleteProduct(productToDelete)).subscribe(() => {
      this.productsListener.next(productToDelete);
    });

    // this.products = this.products.filter(
    //   (product: Product) => product !== productToDelete
    // );
    // this.productsListener.next(this.products);
  }
  getNumOfProducts(): number {
    return this.products.length;
  }

  updateProductPrice(product: Product, newPrice: number) {
    product.prev_price = product.curr_price;
    product.curr_price = newPrice;
    // this.productsListener.next(this.products);
  }

  isProductExist(product: Product): boolean {
    return this.products.includes(product);
  }
  updateProductAmount(product: Product, newAmount: number): void {
    product.amount = newAmount;
    // this.productsListener.next(this.products);
  }

  getUniqueId(): number {
    return ++this.counterId;
  }
}
