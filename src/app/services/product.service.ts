import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";
import { productsUrl } from "../config/api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsListener = new Subject<Product[]>();
  private counterId = 4;

  products: Product[] = [];

  constructor(private http:HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  listenProducts(): Observable<Product[]> {
    return this.productsListener.asObservable();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsListener.next(this.products);
  }

  deleteProduct(productToDelete: Product) {
    this.products = this.products.filter(
      (product: Product) => product !== productToDelete
    );
    this.productsListener.next(this.products);
  }
  getNumOfProducts(): number {
    return this.products.length;
  }

  updateProductPrice(product: Product, newPrice: number) {
    product.prev_price = product.curr_price;
    product.curr_price = newPrice;
    this.productsListener.next(this.products);
  }

  isProductExist(product: Product): boolean {
    return this.products.includes(product);
  }
  updateProductAmount(product: Product, newAmount: number): void {
    product.amount = newAmount;
    this.productsListener.next(this.products);
  }
  
  getUniqueId(): number {
      return ++this.counterId;
  }
}
