import { AbstractCartProduct } from './abstract-cart-product';

export interface CartProductIri extends AbstractCartProduct {
  product: string;
}
