import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/app/_interfaces/user';
import { lastValueFrom } from 'rxjs';

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
  readonly statusUrl = 'https://localhost:8000/api/statuses';
  readonly userUrl = 'https://localhost:8000/api/users';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Http GET methods
   */
  checkIfEmailExists(page = 1, email: string): Promise<object> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('email', email.trim());
    return lastValueFrom(this.httpClient.get(`${this.userUrl}?${params}`));
  }

  /**
   * Http POST methods
   */
  addUser(user: User): Promise<object> {
    return lastValueFrom(
      this.httpClient.post(this.userUrl, user, this.httpOptions)
    );
  }
}
