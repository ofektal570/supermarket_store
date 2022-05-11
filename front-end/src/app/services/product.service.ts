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
  private loaded = false;
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private productTrackingPrices: ProductTrackingPricesService
  ) {
    // this.getProducts().subscribe((products) => {
    //   this.products = products;
    //   this.loaded = true;
    //   console.log("edit ", this.products.length);
    // });
  }

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
  // isInitialized() {
  //   return this.loaded;
  // }
  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(productsUrl);
  // }

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

  // const { name, prev_price, curr_price, amount, image_url, product_id } = req.body;

  addProduct(product: Product): void {
    console.log("THATS NOW ME!!", product.product_id);
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

    // this.products.push(product);

    // this.productsListener.next(this.products);
    // this.http
    //   .post(productsUrl, {
    //     name: product.name,
    //     prev_price: product.prev_price,
    //     curr_price: product.curr_price,
    //     amount: product.amount,
    //     image_url: product.image_url,
    //     product_id: product.product_id,
    //   })
    //   .subscribe(() => {
    //     console.log("i added it men");
    //   });
  }

  deleteProduct(productToDelete: Product): void {
    // console.log("im here in Service");
    // this.products = this.products.filter((product: Product) => {
    //   console.log("PRODUCT :", productToDelete, "proudct :", product);
    //   product.product_id !== productToDelete.product_id;
    // });
    // for (let i = 0; i < this.products.length; i++) {
    //   if (this.products[i] === productToDelete) {
    //     this.products.splice(i, 1);
    //   }
    // }

    this.http.delete(getUrlToDeleteProduct(productToDelete)).subscribe(() => {
      this.loadProducts();
    });
    this.cartService.removeProductFromCart(productToDelete);
    this.productTrackingPrices.deleteProductTracking(productToDelete);
  }

  getNumOfProducts(): number {
    return this.products.length;
  }

  // const { product_id, new_price } = req.body;
  updateProductPrice(product: Product, newPrice: number) {
    // product.prev_price = product.curr_price;
    // product.curr_price = newPrice;
    // this.productsListener.next(this.products);
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
    // product.amount = newAmount;
    // this.productsListener.next(this.products);
    console.log('is is the address???: ',updateAmountUrl);
    console.log("THIS IS THE PRODUCT:", product, newAmount);
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
