import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log("this is the result from the get:", products);
      this.products = products;
    });
    this.productService.listenProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addProductToCart(product);
    --product.amount;
  }
}
