import { User } from './user';

export interface CurrentUser extends User {
  status: { name: string };
  roles: string[];
}
