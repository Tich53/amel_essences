import { CartProduct } from './cart-product';

export interface Cart {
  id: number;
  cartProducts: CartProduct[];
}
