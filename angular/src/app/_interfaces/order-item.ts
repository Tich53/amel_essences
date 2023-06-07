import { ProductPackaging } from './product-packaging';

export interface OrderItem {
  id: number;
  amount: number;
  productPackaging: ProductPackaging;
  productQuantity: number;
}
