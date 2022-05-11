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
      console.log("im here");
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

      this.productTrackingPricesService.updateProductPrices(productToUpdatePrice.product_id, currPrice, newPrice);
    }

    this.editMode = !this.editMode;
    this.editedProduct = productToUpdatePrice;
    productForm.resetForm();
  }
}
