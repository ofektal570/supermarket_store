import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "src/app/models/product";
import { ProductTrackingPricesService } from "src/app/services/product-tracking-prices.service";
import { ProductService } from "src/app/services/product.service";

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
    private productTrackingPricesService: ProductTrackingPricesService
  ) {}

  ngOnInit(): void {
    // if (this.productService.isInitialized()) {
    //   this.products = this.productService.initProducts();
    // } else {
    //   this.loadProducts();
    // }
    this.products = this.productService.loadProducts();
    this.productService.listenProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  // loadProducts():void {
  //   this.productService.getProducts().subscribe((products) => {
  //     this.products = products;
  //   });
  // }

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
      console.log(
        "YOU IN CURR/VALUE/ID",
        productToUpdatePrice.curr_price,
        productForm.value.price,
        productToUpdatePrice.product_id
      );
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

  DefaultValues() {
    setTimeout(() => {
      this.productService.addProduct(
        new Product(
          "Hamburger",
          0,
          10,
          5,
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg"
        )
      );
    }, 1000);

    setTimeout(() => {
      this.productService.addProduct(
        new Product(
          "Hot Dog",
          10,
          50,
          10,
          "https://media.wired.com/photos/5b3ac89dc002fe17d01df63d/master/w_2560%2Cc_limit/VegHotDog-80489177w.jpg"
        )
      );
    }, 2000);
    this.productService.addProduct(
      new Product(
        "Pizza",
        5,
        3,
        2,
        "https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800"
      )
    );
  }
}
