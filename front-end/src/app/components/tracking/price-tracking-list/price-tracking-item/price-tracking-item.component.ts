import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-tracking-item',
  templateUrl: './price-tracking-item.component.html',
  styleUrls: ['./price-tracking-item.component.css'],
})
export class PriceTrackingItemComponent implements OnInit {
  @Input() productToTrack: any;
  public displayTable = false;
  
  constructor() { }
  
  ngOnInit(): void {
  }
}
