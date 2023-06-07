import { Cart } from './cart';
import { AbstractUser } from './_abstracts/abstract-user';

export interface User extends AbstractUser {
  id: number;
  status: { name: string };
  roles: string[];
  cart: Cart;
}
