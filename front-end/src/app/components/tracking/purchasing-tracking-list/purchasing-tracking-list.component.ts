import { Component, OnInit } from "@angular/core";
import { PurchasedCart } from "src/app/models/purchased-cart";
import { PurchasedCartService } from "src/app/services/purchased-cart.service";

@Component({
  selector: "app-purchasing-tracking-list",
  templateUrl: "./purchasing-tracking-list.component.html",
  styleUrls: ["./purchasing-tracking-list.component.css"],
})
export class PurchasingTrackingListComponent implements OnInit {
  public purchasedCarts: PurchasedCart[] = [];

  constructor(private purchasedCartsService: PurchasedCartService) {}

  ngOnInit(): void {
    this.purchasedCartsService.loadPurchasedCarts();
    this.purchasedCartsService
      .listenPurchasedCarts()
      .subscribe((purchasedCarts: PurchasedCart[]) => {
        this.purchasedCarts = purchasedCarts;
      });
  }
}
