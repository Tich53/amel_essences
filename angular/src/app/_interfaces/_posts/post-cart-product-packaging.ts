import { AbstractCartProductPackaging } from '../_abstracts/abstract-cart-product-packaging';

export interface PostCartProductPackaging extends AbstractCartProductPackaging {
  productPackaging: string;
}
