import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasing-tracking-item',
  templateUrl: './purchasing-tracking-item.component.html',
  styleUrls: ['./purchasing-tracking-item.component.css'],
})

  //fix any
export class PurchasingTrackingItemComponent implements OnInit {
  @Input() phrchasedCart: any;
  public expandMore = false;

  constructor() {}

  ngOnInit(): void {}
}
