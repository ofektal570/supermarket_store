import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.css"],
})

//fix any
export class ProductItemComponent implements OnInit {
  @Input() productItem: any;
  arrowDirection: string = "";
  
  constructor() {}

  ngOnInit(): void {
    this.calcChangePriceInPercent();
  }
  
  calcChangePriceInPercent(): string {
    let precentsChange =
      ((this.productItem.prevPrice - this.productItem.currPrice) /
        this.productItem.prevPrice) *
      100;
    if (precentsChange > 0) {
      this.arrowDirection = "down";
    } else {
      this.arrowDirection = "up";
      precentsChange = -precentsChange;
    }
    return precentsChange.toFixed(2);
  }
}
