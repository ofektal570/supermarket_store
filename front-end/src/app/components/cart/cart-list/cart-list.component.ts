import { Component, OnInit } from "@angular/core";
import { CartItem } from "src/app/models/cart-item";
import { PurchasedProduct } from "src/app/models/purchased-product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";
import { PurchasedCartService } from "src/app/services/purchased-cart.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.css"],
})
export class CartListComponent implements OnInit {
  cartItems: CartItem[] = this.cartService.getCartItems();
  cartTotal = 0;
  deliveryType: number = this.cartService.getDeliveryOption();

  constructor(
    private cartService: CartService,
    private purchasedCartService: PurchasedCartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.calcCartTotal();

    this.cartService.listenCartItems().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.deliveryType = this.cartService.getDeliveryOption();
      this.calcCartTotal();
    });
  }

  calcCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach((item: CartItem) => {
      this.cartTotal += item.qty * item.product.curr_price;
    });

    if (this.deliveryType == 2) {
      this.cartTotal += 5;
    }
  }

  buyCart(): void {
    const purchasedProducts: PurchasedProduct[] = [];

    this.cartItems.forEach((cartItem: CartItem) => {
      purchasedProducts.push(
        new PurchasedProduct(
          cartItem.product.name,
          cartItem.qty,
          cartItem.product.curr_price
        )
      );
    });

    this.purchasedCartService.addPurchasedCart(
      purchasedProducts,
      this.cartTotal,
      this.deliveryType
    );
    this.cartService.emptyCart();
    alert("Thank you for buying");
  }

  emptyCartBeforeBuy() {
    if (confirm("Are you sure to emptyCart ?")) {
      this.cartItems.forEach((cartItem: CartItem) => {
        this.productService.updateProductAmount(
          cartItem.product,
          cartItem.product.amount + cartItem.qty
        );
      });
      this.cartService.emptyCart();
    }
  }

  deliveryOption(event: any): void {
    this.deliveryType = event.target.value;
    this.calcCartTotal();
    this.cartService.setDeliveryOption(this.deliveryType);
  }

  couponApply(couponInput: NgForm) {
    alert("This coupon isn't exist");
    couponInput.resetForm();
  }

  calcNumOfProducts(): number {
    let number = 0;

    this.cartItems.forEach((cartItem: CartItem) => {
      number += cartItem.qty;
    });

    return number;
  }
}
