import { AbstractCartProductPackaging } from './abstract-cart-product-packaging';
import { ProductPackaging } from '../../product-packaging';

export interface CartProductPackaging extends AbstractCartProductPackaging {
  id: number;
  productPackaging: ProductPackaging;
}
