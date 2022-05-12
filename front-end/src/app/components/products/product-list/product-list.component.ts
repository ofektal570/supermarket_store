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
    this.products = this.productService.loadProducts();
    this.productService.listenProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.productService.updateProductAmount(product, product.amount - 1);
    this.cartService.addProductToCart(product);
  }
}
