import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductTrackingPricesService } from 'src/app/services/product-tracking-prices.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
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
    this.products = this.productService.getProducts();
    this.productService.listenProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onDeleteProduct(productToDelete: Product) {
    if (confirm('Are you sure to delete ' + productToDelete.name + '?')) {
        this.productService.deleteProduct(productToDelete);
    }
  }

  onUpdatePrice(productForm: NgForm, productToUpdatePrice: Product) {
    if (this.editMode === true && productForm.value.price !== '') {
      this.productService.updateProductPrice(
        productToUpdatePrice,
        productForm.value.price
      );

      this.productTrackingPricesService.updateProductPrices(
        productToUpdatePrice
      );
    }

    this.editMode = !this.editMode;
    this.editedProduct = productToUpdatePrice;
    productForm.resetForm();
  }
}
