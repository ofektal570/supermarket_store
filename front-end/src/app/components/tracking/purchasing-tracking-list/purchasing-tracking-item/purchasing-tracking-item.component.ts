import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-purchasing-tracking-item",
  templateUrl: "./purchasing-tracking-item.component.html",
  styleUrls: ["./purchasing-tracking-item.component.css"],
})
export class PurchasingTrackingItemComponent implements OnInit {
  @Input() phrchasedCart: any;
  public expandMore = false;
  public delivery: string = "";

  constructor() {}

  ngOnInit(): void {
    this.delivery = this.phrchasedCart.delivery == 1 ? "Take-Away" : "Standard-Delivery";
  }
}
