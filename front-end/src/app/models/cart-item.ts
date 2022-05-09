import { Product } from "./product";

export class CartItem {
  public qty = 1;

  constructor(public product: Product) {}
}
