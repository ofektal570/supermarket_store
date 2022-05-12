import { Component } from "@angular/core";
import { ProductTrackingPricesService } from "./services/product-tracking-prices.service";
import { ProductService } from "./services/product.service";
import { WebSocketService } from "./services/web-socket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "supermarket-store";

  constructor(
    private webSocketService: WebSocketService,
    private productService: ProductService,
    private productTrackingPricesService: ProductTrackingPricesService,
  ) {}

  ngOnInit() {
    this.webSocketService.listen("update-price-stream").subscribe((data) => {
      console.log("I GOT THIS:", data);
      this.productService.loadProducts();
      this.productTrackingPricesService.loadProductsTrackingPrices();
    });
  }
}
