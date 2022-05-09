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
  cartItems: CartItem[] = [];
  cartTotal = 0;
  delivery: number = 1;

  constructor(
    private cartService: CartService,
    private purchasedCartService: PurchasedCartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calcCartTotal();

    this.cartService.listenCartItems().subscribe((cartItems: CartItem[]) => {
      this.cartItems = cartItems;
      this.calcCartTotal();
    });
  }

  //reduce?
  calcCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach((item: CartItem) => {
      this.cartTotal += item.qty * item.product.currPrice;
    });

    if (this.delivery == 2) {
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
          cartItem.product.currPrice
        )
      );
    });

    this.purchasedCartService.addPurchasedCart(purchasedProducts, this.cartTotal);
    // this.cartTotal = 0;
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

  // returnProduct(item: CartItem): void {
  //   if (confirm("Are you sure to delete " + item.product.name + "?")) {
  //     ++item.product.amount;
      
  //     if (!this.productService.isProductExist(item.product)) {
  //       this.productService.addProduct(item.product);
  //     }
  //     console.log('qtyyy:',item.qty);
  //     if (0 === item.qty) {
  //       this.cartService.removeProductFromCart(item.product);
  //     }
  //     --item.qty;
  //     this.calcCartTotal();
  //   }
  // }

  deliveryOption(event: any): void {
    this.delivery = event.target.value;
    this.calcCartTotal();
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
