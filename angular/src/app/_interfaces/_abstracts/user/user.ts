import { Cart } from '../../cart';
import { AbstractUser } from './abstract-user';

export interface User extends AbstractUser {
  id: number;
  status: { name: string };
  roles: string[];
  cart: Cart;
}
