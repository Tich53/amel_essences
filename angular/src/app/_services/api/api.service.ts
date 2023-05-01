import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/_interfaces/_abstracts/user/user';
import { RegistratingUser } from 'src/app/_interfaces/_abstracts/user/registrating-user';
import { HydraProduct } from 'src/app/_interfaces/_hydras/hydra-product';
import { HydraCategory } from 'src/app/_interfaces/_hydras/hydra-category';
import { HydraGender } from 'src/app/_interfaces/_hydras/hydra-gender';
import { HydraPackaging } from 'src/app/_interfaces/_hydras/hydra-packaging';
import { HydraCartProductPackaging } from 'src/app/_interfaces/_hydras/hydra-cart-product-packaging';
import { CartProductPackagingIri } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging-iri';
import { PatchQuantityPrice } from 'src/app/_interfaces/_patches/patch-quantity-price';
import { CartProductPackaging } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { OrderIri } from 'src/app/_interfaces/order-iri';
import { HydraOrder } from 'src/app/_interfaces/_hydras/hydra-order';
import { OrderItemIri } from 'src/app/_interfaces/order-item-iri';
import { PatchOrder } from 'src/app/_interfaces/_patches/patch-order';
import { Order } from 'src/app/_interfaces/order';
import { HydraUser } from 'src/app/_interfaces/_hydras/hydra-user';
import { PatchUser } from 'src/app/_interfaces/patches/patch-user';

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
  readonly orderUrl = 'https://localhost:8000/api/orders';
  readonly orderItemUrl = 'https://localhost:8000/api/order_items';
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
  readonly httpOptionsJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  readonly httpOptionsPatchJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * Http GET methods
   */
  checkIfEmailExists(page = 1, email: string): Promise<User> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('email', email.trim());
    return lastValueFrom(
      this.httpClient.get<User>(`${this.userUrl}?${params}`)
    );
  }
  getCurrentUser(): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(this.meUrl));
  }

  getUsers(): Promise<HydraUser> {
    return lastValueFrom(this.httpClient.get<HydraUser>(this.userUrl));
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
  getOrders(): Promise<HydraOrder> {
    return lastValueFrom(this.httpClient.get<HydraOrder>(this.orderUrl));
  }

  /**
   * Http POST methods
   */
  addUser(registratingUser: RegistratingUser): Promise<RegistratingUser> {
    return lastValueFrom(
      this.httpClient.post<RegistratingUser>(
        this.userUrl,
        registratingUser,
        this.httpOptionsJson
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
        this.httpOptionsJson
      )
    );
  }

  createOrder(order: OrderIri): Promise<OrderIri> {
    return lastValueFrom(
      this.httpClient.post<OrderIri>(this.orderUrl, order, this.httpOptionsJson)
    );
  }

  validateSelectedCartProductPackagings(
    orderItem: OrderItemIri
  ): Promise<OrderItemIri> {
    return lastValueFrom(
      this.httpClient.post<OrderItemIri>(
        this.orderItemUrl,
        orderItem,
        this.httpOptionsJson
      )
    );
  }

  /**
   * Http PATCH methods
   */
  addOneCartProductPackaging(
    cartProductPackagingId: number,
    patchQuantityPrice: PatchQuantityPrice
  ): Promise<PatchQuantityPrice> {
    return lastValueFrom(
      this.httpClient.patch<PatchQuantityPrice>(
        `${this.cartProductPackagingUrl}/${cartProductPackagingId}`,
        patchQuantityPrice,
        this.httpOptionsPatchJson
      )
    );
  }

  patchOrderAmount(
    orderId: number,
    patchOrder: PatchOrder
  ): Promise<PatchOrder> {
    return lastValueFrom(
      this.httpClient.patch<PatchOrder>(
        `${this.orderUrl}/${orderId}`,
        patchOrder,
        this.httpOptionsPatchJson
      )
    );
  }

  patchUserStatus(user: User, patchUser: PatchUser): Promise<PatchUser> {
    return lastValueFrom(
      this.httpClient.patch<PatchUser>(
        `${this.userUrl}/${user.id}`,
        patchUser,
        this.httpOptionsPatchJson
      )
    );
  }

  /**
   * Http DELETE methods
   */
  deleteCartProductPackaging(
    cartProductPackaging: CartProductPackaging
  ): Promise<number> {
    return lastValueFrom(
      this.httpClient.delete<number>(
        `${this.cartProductPackagingUrl}/${cartProductPackaging.id}`
      )
    );
  }

  deleteOrder(order: Order): Promise<Order> {
    return lastValueFrom(
      this.httpClient.delete<Order>(`${this.orderUrl}/${order.id}`)
    );
  }
}
