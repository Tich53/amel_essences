import { Cart } from '../../cart';
import { AbstractUser } from './abstract-user';

export interface CurrentUser extends AbstractUser {
  id: number;
  status: { name: string };
  roles: string[];
  cart: Cart;
}
