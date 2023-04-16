import { CartProduct } from '../cart-product';

export interface HydraCartProduct {
  'hydra:member': CartProduct[];
  'hydra:totalItems': number;
}
