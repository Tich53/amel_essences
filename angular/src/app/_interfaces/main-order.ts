import { Order } from './order';

export interface MainOrder {
  id: number;
  reference: string;
  amount: number;
  closingDate: Date;
  orders: Order[];
}
