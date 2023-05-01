import { MainOrder } from './main-order';
import { OrderItem } from './order-item';
import { CurrentUser } from './_abstracts/user/current-user';

export interface Order {
  id: number;
  reference: string;
  productQuantity: number;
  amount: 0;
  userAccount: CurrentUser;
  orderItems: OrderItem[];
  mainOrder: MainOrder;
  show: boolean;
  createdAt: Date;
}
