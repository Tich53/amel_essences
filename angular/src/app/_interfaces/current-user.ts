import { Cart } from './cart';
import { User } from './user';

export interface CurrentUser extends User {
  status: { name: string };
  roles: string[];
  cart: Cart;
}
