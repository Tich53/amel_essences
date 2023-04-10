import { Product } from '../product';

export interface HydraProduct {
  'hydra:member': Product[];
  hydraTotalItems: number;
}
