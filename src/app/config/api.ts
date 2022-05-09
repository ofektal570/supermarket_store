import { environment } from "src/environments/environment";
import { Product } from "../models/product";

export const baseUrl = environment.production
  ? "http://api.supermarket-store.com"
  : "http://localhost:3000";
export const adminsUrl = baseUrl + "/admins";
export const productsUrl = baseUrl + "/products";

export function getUrlToDeleteProduct(product: Product): string {
  return productsUrl + "/" + product.product_id;
}
