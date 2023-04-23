import { CartProductPackaging } from './_abstracts/cart-product-packaging/cart-product-packaging';

export interface Cart {
  id: number;
  cartProductPackagings: CartProductPackaging[];
}
