export class Product {
  private last_update: Date;

  constructor(
    public name: string,
    public prevPrice: number,
    public currPrice: number,
    public amount: number,
    public image_url: string
  ) {
    this.last_update = new Date();
  }
}
