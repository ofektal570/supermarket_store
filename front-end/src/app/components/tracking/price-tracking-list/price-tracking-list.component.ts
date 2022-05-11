import { Component, OnInit } from "@angular/core";
import { ProductTrackingPrices } from "src/app/models/product-tracking-prices";
import { ProductTrackingPricesService } from "src/app/services/product-tracking-prices.service";

@Component({
  selector: "app-price-tracking-list",
  templateUrl: "./price-tracking-list.component.html",
  styleUrls: ["./price-tracking-list.component.css"],
})
export class PriceTrackingListComponent implements OnInit {
  public productsTrackingPrices: ProductTrackingPrices[] = [];

  constructor(private productTrackingPricesService: ProductTrackingPricesService) {}

  ngOnInit(): void {
    this.productTrackingPricesService.loadProductsTrackingPrices();
    this.productTrackingPricesService
      .listenProductTrackingPrices()
      .subscribe((productsTrackingPrices: ProductTrackingPrices[]) => {
        this.productsTrackingPrices = productsTrackingPrices;
      });
  }
}
