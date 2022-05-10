import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";
import { productsUrl, getUrlToDeleteProduct } from "../config/api";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsListener = new Subject<Product[]>();
  private counterId = 4;
  private loaded = false;
  products: Product[] = [
    new Product(
      "Hamburger",
      0,
      10,
      5,
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg",
      1
    ),
    new Product(
      "Pizza",
      5,
      3,
      2,
      "https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800",
      2
    ),
    new Product(
      "Hot Dog",
      10,
      50,
      10,
      "https://media.wired.com/photos/5b3ac89dc002fe17d01df63d/master/w_2560%2Cc_limit/VegHotDog-80489177w.jpg",
      3
    ),
  ];

  constructor() {
    // this.getProducts().subscribe((products) => {
    //   this.products = products;
    //   this.loaded = true;
    //   console.log("edit ", this.products.length);
    // });
  }

  getProducts(): Product[] {
    return this.products;
  }
  isInitialized() {
    return this.loaded;
  }
  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(productsUrl);
  // }

  listenProducts(): Observable<Product[]> {
    return this.productsListener.asObservable();
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.productsListener.next(this.products);
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
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i] === productToDelete) {
        this.products.splice(i, 1);
      }
    }
    this.productsListener.next(this.products);

    // this.http.delete(getUrlToDeleteProduct(productToDelete)).subscribe(() => {
    //   console.log('i did it men');
    // });
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
    return this.counterId++;
  }
}
