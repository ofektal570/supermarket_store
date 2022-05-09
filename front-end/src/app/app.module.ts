import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NavComponent } from "./components/shared/nav/nav.component";
import { StoreComponent } from "./components/store/store.component";
import { ProductAddComponent } from "./components/products/product-add/product-add.component";
import { ProductEditComponent } from "./components/products/product-add/product-edit/product-edit.component";
import { ProductListComponent } from "./components/products/product-list/product-list.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { CartListComponent } from "./components/cart/cart-list/cart-list.component";
import { CartItemComponent } from "./components/cart/cart-list/cart-item/cart-item.component";
import { ProductItemComponent } from "./components/products/product-list/product-item/product-item.component";
import { PurchasingTrackingListComponent } from "./components/tracking/purchasing-tracking-list/purchasing-tracking-list.component";
import { PurchasingTrackingItemComponent } from "./components/tracking/purchasing-tracking-list/purchasing-tracking-item/purchasing-tracking-item.component";
import { PriceTrackingListComponent } from "./components/tracking/price-tracking-list/price-tracking-list.component";
import { PriceTrackingItemComponent } from "./components/tracking/price-tracking-list/price-tracking-item/price-tracking-item.component";
import { AuthenticationAdminComponent } from "./components/authentication-admin/authentication-admin.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StoreComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    FooterComponent,
    CartListComponent,
    CartItemComponent,
    ProductItemComponent,
    PurchasingTrackingListComponent,
    PurchasingTrackingItemComponent,
    PriceTrackingListComponent,
    PriceTrackingItemComponent,
    AuthenticationAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
