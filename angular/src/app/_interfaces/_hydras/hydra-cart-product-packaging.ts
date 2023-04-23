import { CartProductPackaging } from '../_abstracts/cart-product-packaging/cart-product-packaging';

export interface HydraCartProductPackaging {
  'hydra:member': CartProductPackaging[];
  'hydra:totalItems': number;
}
