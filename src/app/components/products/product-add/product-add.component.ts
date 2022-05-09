import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"],
})
export class ProductAddComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    } else if (this.productService.getNumOfProducts() >= 5) {
      alert("You can't add more than 5 products");
      productForm.resetForm();
      return;
    }

    const imageUrl =
      productForm.value.ImageUrl === "" || productForm.value.ImageUrl === null
        ? "https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available-.jpg?ver=6"
        : productForm.value.ImageUrl;

    const newProduct = new Product(
      productForm.value.name,
      0,
      productForm.value.initPrice,
      productForm.value.initAmount,
      imageUrl,
      this.productService.getUniqueId()
    );

    this.productService.addProduct(newProduct);
    productForm.resetForm();
  }
}
