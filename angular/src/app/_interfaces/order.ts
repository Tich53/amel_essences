import { MainOrder } from './main-order';
import { OrderItem } from './order-item';
import { User } from './user';

export interface Order {
  id: number;
  reference: string;
  productQuantity: number;
  amount: 0;
  userAccount: User;
  orderItems: OrderItem[];
  mainOrder: MainOrder;
  show: boolean;
  createdAt: Date;
}
