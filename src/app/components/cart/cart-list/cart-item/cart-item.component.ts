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
  @Input() cartItem: CartItem = new CartItem(new Product("dummy", 0, 1, 1, ""));
  firstAmountItem: number = 0;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.firstAmountItem = this.cartItem.product.amount + 1;
  }

  onChangeQty(qtyUser: any): void {
    // if (!this.productService.isProductExist(this.cartItem.product)) {
    //   this.productService.addProduct(this.cartItem.product);
    // }
    
    this.productService.updateProductAmount(
      this.cartItem.product,
      this.firstAmountItem - parseInt(qtyUser.target.value)
    );
    
    this.cartItem.qty = parseInt(qtyUser.target.value);
    this.cartService.calcCartTotal();
  }

  returnProduct(): void {
    if (confirm("Are you sure to return " + this.cartItem.product.name + "?")) {
      if (this.cartItem.qty) {
        this.productService.updateProductAmount(
          this.cartItem.product,
          this.cartItem.product.amount + 1
        );
      }


      
      if (!this.productService.isProductExist(this.cartItem.product)) {
        this.productService.addProduct(this.cartItem.product);
      }
      
      if (0 === this.cartItem.qty) {
        this.cartService.removeProductFromCart(this.cartItem.product);
      }
      --this.cartItem.qty;
      this.cartService.calcCartTotal();
    }
  }
}
