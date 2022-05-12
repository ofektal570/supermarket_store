import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "src/app/models/product";
import { CartService } from "src/app/services/cart.service";
import { ProductTrackingPricesService } from "src/app/services/product-tracking-prices.service";
import { ProductService } from "src/app/services/product.service";
import { PurchasedCartService } from "src/app/services/purchased-cart.service";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  products: Product[] = [];
  editedProduct: Product | undefined;
  editMode: boolean = false;

  constructor(
    private productService: ProductService,
    private productTrackingPricesService: ProductTrackingPricesService,
    private cartService: CartService,
    private purchasedCartService: PurchasedCartService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.loadProducts();
    this.productService.listenProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onDeleteProduct(productToDelete: Product): void {
    if (confirm("Are you sure to delete " + productToDelete.name + "?")) {
      this.productService.deleteProduct(productToDelete);
    }
  }

  isPriceValid(price: string): boolean {
    return price !== "" && typeof price !== "undefined";
  }

  onUpdatePrice(productForm: NgForm, productToUpdatePrice: Product): void {
    if (
      this.editMode === true &&
      this.isPriceValid(productForm.value.price) &&
      productForm.value.price !== productToUpdatePrice.curr_price
    ) {
      let currPrice = productToUpdatePrice.curr_price;
      let newPrice = productForm.value.price;
      this.productService.updateProductPrice(productToUpdatePrice, newPrice);

      this.productTrackingPricesService.updateProductPrices(
        productToUpdatePrice.product_id,
        currPrice,
        newPrice
      );
    }

    this.editMode = !this.editMode;
    this.editedProduct = productToUpdatePrice;
    productForm.resetForm();
  }

  addStoreDefaultProducts() {
    let hamburger = new Product(
      "Hamburger",
      0,
      10,
      5,
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg"
    );

    let pizza = new Product(
      "Pizza",
      0,
      8.5,
      8,
      "https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
    );

    let hotDog = new Product(
      "Hot Dog",
      0,
      2.5,
      10,
      "https://media.wired.com/photos/5b3ac89dc002fe17d01df63d/master/w_2560%2Cc_limit/VegHotDog-80489177w.jpg"
    );

    let schnitzel = new Product(
      "Schnitzel",
      0,
      15,
      5,
      "https://www.theedgyveg.com/wp-content/uploads/2020/11/DSC00781-2WEB.jpg"
    );

    let stake = new Product(
      "Stake",
      0,
      30,
      10,
      "https://vistapointe.net/images/stake-12.jpg"
    );

    let foods = [hamburger, pizza, hotDog, schnitzel, stake];
    let timeout = 0;

    for (let dish of foods) {
      setTimeout(() => {
        this.productService.addProduct(dish);
      }, timeout);

      timeout += 250;
    }

    setTimeout(() => {
      this.productService.updateProductPrice(hamburger, 6.5);

      this.productTrackingPricesService.updateProductPrices(
        hamburger.product_id,
        10,
        6.5
      );
    }, 1000);
  }

  clearDBs() {
    this.cartService.emptyCart();
    this.productTrackingPricesService.clearProductTrackingDb();
    this.productService.clearProductsDb();
    this.purchasedCartService.clearOrdersDb();
  }

  ResetStore() {
    if (confirm("Are you sure to reset all the data in the store?")) {
      this.clearDBs();
      this.addStoreDefaultProducts();
    }
  }
}
