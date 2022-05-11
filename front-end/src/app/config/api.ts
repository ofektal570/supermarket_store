import { environment } from "src/environments/environment";
import { Product } from "../models/product";

export const baseUrl = environment.production
  ? "http://api.supermarket-store.com"
  : "http://localhost:3000";
export const adminsUrl = baseUrl + "/admins";
export const productsUrl = baseUrl + "/products";
export const updatePriceUrl = productsUrl + "/update_price";
export const updateAmountUrl = productsUrl + "/update_amount";
export const getUniqueIdUrl = productsUrl + "/unique_id";
export const cartUrl = baseUrl + "/cart";
export const updateQtyUrl = cartUrl + "/update_qty";
export const updateDeliveryUrl = cartUrl + "/update_delivery";
export const ordersUrl = baseUrl + "/orders";
export const pricesUrl = baseUrl + "/prices";


export function getUrlToDeleteProduct(product: Product): string {
  return productsUrl + "/" + product.product_id;
}

export function getUrlToReturnProduct(product: Product): string {
  return cartUrl + "/" + product.product_id;
}
