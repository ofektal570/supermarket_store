import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsListener = new Subject<Product[]>();

  products: Product[] = [
    new Product(
      "pizza",
      0,
      10,
      3,
      "https://media-cdn.tripadvisor.com/media/photo-s/1b/b5/0e/a5/pizza-hut-belfield.jpg"
    ),
    new Product(
      "hamburger",
      50,
      35,
      6,
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg"
    ),
    new Product(
      "stake",
      40,
      75,
      2,
      "https://thumbs.dreamstime.com/b/food-beef-dinner-main-course-grilled-stake-food-beef-dinner-main-course-delicious-grilled-stake-cutting-board-107147069.jpg"
    ),
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
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
    product.prevPrice = product.currPrice;
    product.currPrice = newPrice;
    this.productsListener.next(this.products);
  }

  isProductExist(product: Product): boolean {
    return this.products.includes(product);
  }
  updateProductAmount(product: Product, newAmount: number): void {
    if (newAmount === 0) {
      this.deleteProduct(product);
    } else {
      product.amount = newAmount;
    }
    this.productsListener.next(this.products);
  }
}
