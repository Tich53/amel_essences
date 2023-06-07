import { CartProductPackaging } from './cart-product-packaging';

export interface Cart {
  id: number;
  cartProductPackagings: CartProductPackaging[];
}
