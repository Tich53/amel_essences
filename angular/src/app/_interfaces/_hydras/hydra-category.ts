import { Category } from '../category';

export interface HydraCategory {
  'hydra:member': Category[];
  'hydra:totalItems': number;
}
