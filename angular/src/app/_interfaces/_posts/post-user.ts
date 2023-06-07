import { AbstractUser } from '../_abstracts/abstract-user';

export interface PostUser extends AbstractUser {
  plainPassword: string;
}
