import { Category } from '../category';

export interface HydraCategory {
  'hydra:member': Category[];
  hydraTotalItems: number;
}
