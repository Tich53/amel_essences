import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from 'src/app/_interfaces/current-user';
import { RegistratingUser } from 'src/app/_interfaces/registrating-user';
import { Product } from 'src/app/_interfaces/product';

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

  getProducts(): Promise<Product> {
    return lastValueFrom(this.httpClient.get<Product>(this.productUrl));
  }

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
