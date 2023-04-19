import { Category } from './category';
import { Gender } from './gender';
import { ProductPackaging } from './product-packaging';
import { Range } from './range';

export interface Product {
  id: number;
  name: string;
  preference: string;
  category: Category;
  gender: Gender;
  rangeAccount: Range;
  productPackagings: ProductPackaging[];
  selectedProductPackaging: ProductPackaging;
}
