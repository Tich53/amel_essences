import { MainOrder } from './main-order';

export interface OrderIri {
  productQuantity: number;
  amount: number;
  userAccount: string;
  mainOrder?: string;
}
