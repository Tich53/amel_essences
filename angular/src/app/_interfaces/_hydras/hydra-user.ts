import { User } from '../user';

export interface HydraUser {
  'hydra:member': User[];
  'hydra:totalItems': number;
}
