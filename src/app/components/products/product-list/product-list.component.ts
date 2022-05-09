import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.listenProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    // if (this.cartService.amountOfProduct(product) === product.amount) {
    //   alert('You have reached the maximum quantity of the product');
    // } else {
    //   this.cartService.addProductToCart(product);
    // }

    this.cartService.addProductToCart(product);
    --product.amount === 0;
    // if (--product.amount === 0) {
      // this.productService.deleteProduct(product);
    // }
  }
}
