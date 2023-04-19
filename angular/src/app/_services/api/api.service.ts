import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { CurrentUser } from 'src/app/_interfaces/_abstract/user/current-user';
import { RegistratingUser } from 'src/app/_interfaces/_abstract/user/registrating-user';
import { HydraProduct } from 'src/app/_interfaces/_hydras/hydra-product';
import { HydraCategory } from 'src/app/_interfaces/_hydras/hydra-category';
import { HydraGender } from 'src/app/_interfaces/_hydras/hydra-gender';
import { HydraPackaging } from 'src/app/_interfaces/_hydras/hydra-packaging';
import { HydraCartProductPackaging } from 'src/app/_interfaces/_hydras/hydra-cart-product-packaging';
import { CartProductPackagingIri } from 'src/app/_interfaces/_abstract/cart-product-packaging/cart-product-packaging-iri';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * URL
   */
  readonly categoryUrl = 'https://localhost:8000/api/categories';
  readonly genderUrl = 'https://localhost:8000/api/genders';
  readonly mainOrderUrl = 'https://localhost:8000/api/main_orders';
  readonly orderProductUrl = 'https://localhost:8000/api/order_products';
  readonly orderUrl = 'https://localhost:8000/api/orders';
  readonly packagingUrl = 'https://localhost:8000/api/packagings';
  readonly productPackagingUrl =
    'https://localhost:8000/api/product_packagings';
  readonly productUrl = 'https://localhost:8000/api/products';
  readonly statusUrl = 'https://localhost:8000/api/statuses';
  readonly userUrl = 'https://localhost:8000/api/users';
  readonly meUrl = 'https://localhost:8000/api/me';
  readonly cartProductPackagingUrl =
    'https://localhost:8000/api/cart_product_packagings';

  /**
   * IRI
   */
  readonly productIri = '/api/products/';

  /**
   * HTTPOptions
   */
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

  getCategory(): Promise<HydraCategory> {
    return lastValueFrom(this.httpClient.get<HydraCategory>(this.categoryUrl));
  }
  getGender(): Promise<HydraGender> {
    return lastValueFrom(this.httpClient.get<HydraGender>(this.genderUrl));
  }
  getPackaging(): Promise<HydraPackaging> {
    return lastValueFrom(
      this.httpClient.get<HydraPackaging>(this.packagingUrl)
    );
  }
  getProducts(
    name: string | null,
    preference: string | null,
    categories: string[] | null,
    genders: string[] | null,
    capacities: number[] | null
  ): Promise<HydraProduct> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (preference) {
      params = params.set('preference', preference);
    }

    if (categories) {
      for (const category of categories) {
        params = params.append('category[]', category);
      }
    }
    if (genders) {
      for (const gender of genders) {
        params = params.append('gender[]', gender);
      }
    }
    if (capacities) {
      for (const capacity of capacities) {
        params = params.append(
          'productPackagings.packaging.capacity[]',
          capacity
        );
      }
    }
    return lastValueFrom(
      this.httpClient.get<HydraProduct>(`${this.productUrl}?${params}`)
    );
  }
  getCartProductPackagings(): Promise<HydraCartProductPackaging> {
    return lastValueFrom(
      this.httpClient.get<HydraCartProductPackaging>(
        this.cartProductPackagingUrl
      )
    );
  }

  /**
   * Http POST methods
   */
  addUser(registratingUser: RegistratingUser): Promise<RegistratingUser> {
    return lastValueFrom(
      this.httpClient.post<RegistratingUser>(
        this.userUrl,
        registratingUser,
        this.httpOptions
      )
    );
  }

  postCartProductPackaging(
    cartProductPackaging: CartProductPackagingIri
  ): Promise<CartProductPackagingIri> {
    return lastValueFrom(
      this.httpClient.post<CartProductPackagingIri>(
        this.cartProductPackagingUrl,
        cartProductPackaging,
        this.httpOptions
      )
    );
  }
}
