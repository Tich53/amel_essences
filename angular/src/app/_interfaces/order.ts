import { CurrentUser } from './_abstracts/user/current-user';

export interface Order {
  id: number;
  reference: string;
  amount: 0;
  userAccount: CurrentUser;
}
