import { AbstractUser } from './abstract-user';

export interface RegistratingUser extends AbstractUser {
  plainPassword: string;
}
