import { User } from '../_abstracts/user/user';

export interface HydraUser {
  'hydra:member': User[];
  'hydra:totalItems': number;
}
