import { CartProduct } from './_abstract/cart-product/cart-product';

export interface Cart {
  id: number;
  cartProducts: CartProduct[];
}
