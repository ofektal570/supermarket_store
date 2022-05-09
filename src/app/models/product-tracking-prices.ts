import { Product } from "./product";

export class ProductTrackingPrices {
  public productPrices: {
    prevPrice: number;
    currPrice: number;
    date: string;
    precents: string;
    arrowDirection: string;
  }[] = [];

  constructor(public product: Product) {
    this.addNewTracking(product.prevPrice, product.currPrice);
  }

  addNewTracking(prevPrice: number, currPrice: number) {
    let arrowDirection = "";
    let precentsChange: number | string = ((prevPrice - currPrice) / prevPrice) * 100;

    if (precentsChange > 0) {
      arrowDirection = "down";
    } else {
      arrowDirection = "up";
      precentsChange = -precentsChange;
    }

    precentsChange = precentsChange.toFixed(2);

    this.productPrices.push({
      prevPrice: prevPrice,
      currPrice: currPrice,
      date: new Date().toDateString(),
      precents: precentsChange,
      arrowDirection: arrowDirection,
    });
  }
}
