export class ProductTrackingPrices {
  public productPrices: {
    prevPrice: number;
    currPrice: number;
    date: string;
    precents: string;
    arrowDirection: string;
  }[] = [];

  constructor(
    public productName: string,
    pricesSummary: {
      prices: number[];
      dates: string[];
    }
  ) {
    this.initTable(pricesSummary.prices, pricesSummary.dates);
  }

  initTable(prices: number[], dates: string[]): void {
    for (let i = 0; i < dates.length; i++) {
      this.addNewTracking(prices[i], prices[i + 1], dates[i]);
    }
  }

  addNewTracking(prevPrice: number, currPrice: number, dateTrack: string): void {
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
      date: dateTrack,
      precents: precentsChange,
      arrowDirection: arrowDirection,
    });
  }
}
