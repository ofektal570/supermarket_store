export class Product {
  constructor(
    public name: string,
    public prev_price: number,
    public curr_price: number,
    public amount: number,
    public image_url: string,
    public product_id: number = 1
  ) {}
}
