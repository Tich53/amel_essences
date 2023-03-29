import { User } from './user';

export interface RegistratingUser extends User {
  plainPassword: string;
}
