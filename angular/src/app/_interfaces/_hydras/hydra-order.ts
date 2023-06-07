import { Order } from '../order';

export interface HydraOrder {
  'hydra:member': Order[];
  'hydra:totalItems': number;
}
