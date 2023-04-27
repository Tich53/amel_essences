import { ProductPackaging } from './product-packaging';

export interface OrderItem {
  amount: number;
  productPackaging: ProductPackaging;
  productQuantity: number;
}
