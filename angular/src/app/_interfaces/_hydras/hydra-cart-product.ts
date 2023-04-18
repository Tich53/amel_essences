import { CartProduct } from '../_abstract/cart-product/cart-product';

export interface HydraCartProduct {
  'hydra:member': CartProduct[];
  'hydra:totalItems': number;
}
