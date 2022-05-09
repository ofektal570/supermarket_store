import { environment } from 'src/environments/environment';

export const baseUrl = environment.production
  ? 'http://api.supermarket-store.com'
  : 'http://localhost:3000';
export const adminsUrl = baseUrl + '/admins';
export const productsUrl = baseUrl + '/products';
