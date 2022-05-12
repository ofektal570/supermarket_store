import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationAdminComponent } from "./components/authentication-admin/authentication-admin.component";
import { StoreComponent } from "./components/store/store.component";
import { PriceTrackingListComponent } from "./components/tracking/price-tracking-list/price-tracking-list.component";
import { PurchasingTrackingListComponent } from "./components/tracking/purchasing-tracking-list/purchasing-tracking-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/store", pathMatch: "full" },
  { path: "cart", component: StoreComponent },
  { path: "store", component: StoreComponent },
  { path: "system", component: AuthenticationAdminComponent },
  { path: "tracking/prices", component: PriceTrackingListComponent },
  { path: "tracking/purchased", component: PurchasingTrackingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
