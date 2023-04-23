import { AbstractCartProductPackaging } from './abstract-cart-product-packaging';

export interface CartProductPackagingIri extends AbstractCartProductPackaging {
  productPackaging: string;
}
