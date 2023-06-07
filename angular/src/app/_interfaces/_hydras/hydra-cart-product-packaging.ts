import { CartProductPackaging } from '../cart-product-packaging';

export interface HydraCartProductPackaging {
  'hydra:member': CartProductPackaging[];
  'hydra:totalItems': number;
}
