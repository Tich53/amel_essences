import { Category } from './category';
import { Gender } from './gender';
import { ProductPackaging } from './product-packaging';

export interface Product {
  id: number;
  name: string;
  preference: string;
  category: Category;
  gender: Gender;
  productPackagings: ProductPackaging[];
  selectedProductPackaging: ProductPackaging;
}
