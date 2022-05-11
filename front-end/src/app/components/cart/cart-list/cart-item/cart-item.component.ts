import { Component, Input, OnInit } from "@angular/core";
import { CartItem } from "src/app/models/cart-item";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem = new CartItem(new Product("dummy", 0, 1, 1, "", 0));
  firstAmountItem = 0;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    console.log("loaded");
    // this.firstAmountItem = this.cartItem.product.amount + 1;
  }

  onChangeQty(qtyUser: any): void {
    console.log(typeof qtyUser.target.max);
    if (parseInt(qtyUser.target.value) < parseInt(qtyUser.target.min)) {
      qtyUser.target.value = qtyUser.target.min;
    } else if (parseInt(qtyUser.target.value) > parseInt(qtyUser.target.max)) {
      qtyUser.target.value = qtyUser.target.max;
    }
    console.log("CURRRR", qtyUser.target.value);
    let firstAmountProduct = this.cartItem.product.amount + this.cartItem.qty;
    let newValue = parseInt(qtyUser.target.value);

    this.productService.updateProductAmount(
      this.cartItem.product,
      firstAmountProduct - newValue
    );

    // this.cartItem.qty = newValue;
    this.cartService.updateQtyInDB(this.cartItem.product.product_id, newValue);
    this.cartService.calcCartTotal();
  }

  // returnProduct(): void {
  //   if (confirm("Are you sure to return " + this.cartItem.product.name + "?")) {
  //     if (this.cartItem.qty) {
  //       this.productService.updateProductAmount(
  //         this.cartItem.product,
  //         this.cartItem.product.amount + 1
  //       );
  //     }

  //     if (0 === this.cartItem.qty) {
  //       this.cartService.removeProductFromCart(this.cartItem.product);
  //     } else {
  //       this.cartService.updateQtyInDB(
  //         this.cartItem.product.product_id,
  //         this.cartItem.qty - 1
  //       );
  //       this.cartService.calcCartTotal();
  //     }
  //   }
  // }
  returnProduct(): void {
    if (confirm("Are you sure to return " + this.cartItem.product.name + "?")) {
      // if (this.cartItem.qty) {
        this.productService.updateProductAmount(
          this.cartItem.product,
          this.cartItem.product.amount + this.cartItem.qty
        );
      // }

      // if (0 === this.cartItem.qty) {
        this.cartService.removeProductFromCart(this.cartItem.product);
      // } else {
        // this.cartService.updateQtyInDB(
        //   this.cartItem.product.product_id,
        //   0
        // );
        this.cartService.calcCartTotal();
      }
    }
}
