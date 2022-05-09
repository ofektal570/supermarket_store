import { Component, Input, OnInit } from '@angular/core';
import { ProductTrackingPrices } from 'src/app/models/product-tracking-prices';

@Component({
  selector: 'app-price-tracking-item',
  templateUrl: './price-tracking-item.component.html',
  styleUrls: ['./price-tracking-item.component.css'],
})
export class PriceTrackingItemComponent implements OnInit {
  @Input() productToTrack: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.productToTrack.productPrices);
  }
}
