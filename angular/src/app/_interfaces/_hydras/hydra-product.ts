import { Product } from '../product';

export interface HydraProduct {
  'hydra:member': Product[];
  'hydra:totalItems': number;
}
