import { PurchasedProduct } from "./purchased-product";

export class PurchasedCart {
  public datePurchased: string = new Date().toDateString();

  constructor(
    public purchasedProducts: PurchasedProduct[],
    public totalPrice: number
  ) {}
}
