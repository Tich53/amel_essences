import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from 'src/app/_interfaces/current-user';
import { RegistratingUser } from 'src/app/_interfaces/registrating-user';
import { HydraProduct } from 'src/app/_interfaces/_hydras/hydra-product';
import { HydraCategory } from 'src/app/_interfaces/_hydras/hydra-category';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly categoryUrl = 'https://localhost:8000/api/categories';
  readonly genderUrl = 'https://localhost:8000/api/genders';
  readonly mainOrderUrl = 'https://localhost:8000/api/main_orders';
  readonly orderProductUrl = 'https://localhost:8000/api/order_products';
  readonly orderUrl = 'https://localhost:8000/api/orders';
  readonly packagingUrl = 'https://localhost:8000/api/packaging';
  readonly productPackagingUrl =
    'https://localhost:8000/api/product_packagings';
  readonly productUrl = 'https://localhost:8000/api/products';
  readonly statusUrl = 'https://localhost:8000/api/statuses';
  readonly userUrl = 'https://localhost:8000/api/users';
  readonly meUrl = 'https://localhost:8000/api/me';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Http GET methods
   */
  checkIfEmailExists(page = 1, email: string): Promise<CurrentUser> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('email', email.trim());
    return lastValueFrom(
      this.httpClient.get<CurrentUser>(`${this.userUrl}?${params}`)
    );
  }

  getCurrentUser(): Promise<CurrentUser> {
    return lastValueFrom(this.httpClient.get<CurrentUser>(this.meUrl));
  }

  getProducts(): Promise<HydraProduct> {
    return lastValueFrom(this.httpClient.get<HydraProduct>(this.productUrl));
  }

  getCategory(): Promise<HydraCategory> {
    return lastValueFrom(this.httpClient.get<HydraCategory>(this.categoryUrl));
  }

  // getProducts(
  //   page = 1,
  //   cleanedReference?: any,
  //   rawReference?: any,
  //   cleanedBrand?: any,
  //   rawBrand?: any,
  //   productName?: any,
  //   tags?: any,
  //   min_price?: number,
  //   max_price?: number
  // ) {
  //   let params = new HttpParams();
  //   params = params.set('page', page);
  //   if (cleanedReference) {
  //     params = params.set('cleaned_reference', cleanedReference);
  //   }
  //   if (rawReference) {
  //     params = params.set('raw_reference', rawReference);
  //   }
  //   if (cleanedBrand) {
  //     params = params.set('cleaned_brand', cleanedBrand);
  //   }
  //   if (rawBrand) {
  //     params = params.set('raw_brand', rawBrand);
  //   }
  //   if (productName) {
  //     params = params.set('name', productName);
  //   }
  //   if (tags) {
  //     tags.forEach((tag: any) => {
  //       //tags = affichage dans l'URL
  //       params = params.append('tags[]', tag);
  //     });
  //   }
  //   if (min_price && max_price) {
  //     params = params.set('price[between]', min_price + '..' + max_price);
  //   } else if (min_price) {
  //     params = params.set('price[gte]', min_price);
  //   } else if (max_price) {
  //     params = params.set('price[lte]', max_price);
  //   }
  //   return this.httpClient.get(this.ProductUrl + '?' + params);
  //   // return this.httpClient.get(this.apiUrl);!!!!!!!!!!!!!!!!!!!!!!!!
  // }

  /**
   * Http POST methods
   */
  addUser(user: RegistratingUser): Promise<RegistratingUser> {
    return lastValueFrom(
      this.httpClient.post<RegistratingUser>(
        this.userUrl,
        user,
        this.httpOptions
      )
    );
  }
}
