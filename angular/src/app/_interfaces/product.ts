import { Category } from './category';
import { Gender } from './gender';
import { ProductPackaging } from './product-packaging';

export interface Product {
  name: string;
  category: Category;
  gender: Gender;
  productPackaging: ProductPackaging;
}
