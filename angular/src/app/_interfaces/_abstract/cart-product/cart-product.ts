import { AbstractCartProduct } from './abstract-cart-product';
import { Product } from '../../product';

export interface CartProduct extends AbstractCartProduct {
  product: Product;
}
