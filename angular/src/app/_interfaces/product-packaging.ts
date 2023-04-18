import { Packaging } from './packaging';
import { Product } from './product';

export interface ProductPackaging {
  id: number;
  product: Product;
  packaging: Packaging;
  unitPrice: number;
}
