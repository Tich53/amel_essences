import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProductPackaging } from '../_interfaces/cart-product-packaging';
import { Product } from '../_interfaces/product';
import { HydraCartProductPackaging } from '../_interfaces/_hydras/hydra-cart-product-packaging';
import { HydraProduct } from '../_interfaces/_hydras/hydra-product';
import { ApiService } from '../_services/api/api.service';
import { PatchQuantityPrice } from '../_interfaces/_patches/patch-quantity-price';
import { User } from '../_interfaces/user';
import { HydraOrder } from '../_interfaces/_hydras/hydra-order';
import { Order } from '../_interfaces/order';
import { HydraUser } from '../_interfaces/_hydras/hydra-user';
import { MainOrder } from '../_interfaces/main-order';
import { HydraMainOrder } from '../_interfaces/_hydras/hydra-main-order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly pending = 'En attente';

  currentUser!: User;

  waitingList!: User[];
  waitingListNumber = 0;

  productSubscription?: Subscription;

  products?: Product[];
  productNumber = 0;

  cartProductPackagings?: CartProductPackaging[];
  cartProductQuantity = 0;

  orders?: Order[];
  pendingOrderNumber = 0;

  mainOrders?: MainOrder[];

  hasAddedCartProductPackaging?: boolean;

  menuItemSelection = {
    profileActive: false,
    adminActive: false,
    catalogActive: false,
    orderActive: false,
    cartActive: false,
    waitingListActive: false,
    recapActive: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.apiService
      .getCurrentUser()
      .then((currentUser) => (this.currentUser = currentUser));
    this.getUsers();
    this.getProducts();
    this.getCartProductPackagings();
    this.getOrders();
    this.getMainOrders();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

  getUsers(): void {
    let users: User[];
    this.apiService.getUsers().then((hydraUser: HydraUser) => {
      users = hydraUser['hydra:member'];
      this.waitingList = [];
      this.waitingListNumber = 0;
      users.forEach((user: User) => {
        if (user.status.name === this.pending) {
          this.waitingList?.push(user);
          this.waitingListNumber++;
        }
      });
    });
  }

  getProducts(): void {
    this.productSubscription = this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        const name = params.get('name');
        const preference = params.get('preference');
        const categories = params.getAll('category');
        const genders = params.getAll('gender');
        const capacityStrings = params.getAll(
          'productPackagings.packaging.capacity'
        );
        const capacities = capacityStrings
          ? capacityStrings.map((string) => {
              return parseInt(string);
            })
          : [];
        this.apiService
          .getProducts(name, preference, categories, genders, capacities)
          .then((hydraProduct: HydraProduct) => {
            this.products = hydraProduct['hydra:member'];
            this.productNumber = hydraProduct['hydra:totalItems'];
            this.products.forEach(
              (product) =>
                (product.selectedProductPackaging =
                  product.productPackagings?.[0])
            );
          });
      }
    );
  }

  getCartProductPackagings(): void {
    this.apiService
      .getCartProductPackagings()
      .then((HydraCartProductPackaging: HydraCartProductPackaging) => {
        this.cartProductPackagings = HydraCartProductPackaging[
          'hydra:member'
        ].sort((a: CartProductPackaging, b: CartProductPackaging) =>
          a.productPackaging.product.name.localeCompare(
            b.productPackaging.product.name
          )
        );
        this.cartProductQuantity = 0;
        this.cartProductPackagings.forEach(
          (cartProductPackaging: CartProductPackaging) => {
            this.cartProductQuantity += cartProductPackaging.productQuantity;
          }
        );
      });
  }

  getOrders(): void {
    const now = new Date();
    this.apiService.getOrders().then((hydraOrder: HydraOrder) => {
      this.orders = hydraOrder['hydra:member'].sort(
        (a: Order, b: Order) => b.id - a.id
      );
      this.pendingOrderNumber = 0;
      this.orders.forEach((order: Order) => {
        order.show = false;
        if (
          !order.mainOrder ||
          Date.parse(now.toString()) <
            Date.parse(order.mainOrder.closingDate.toString())
        ) {
          this.pendingOrderNumber++;
        }
      });
    });
  }

  async deleteOrder(order: Order): Promise<void> {
    await this.apiService.deleteOrder(order);
    this.getOrders();
  }

  async addOneCartProductPackaging(
    cartProductPackaging: CartProductPackaging
  ): Promise<void> {
    const cartProductPackagingQuantity =
      cartProductPackaging.productQuantity + 1;

    const cartProductPackagingAmount =
      cartProductPackagingQuantity *
      cartProductPackaging.productPackaging.unitPrice;
    const patchQuantityPrice: PatchQuantityPrice = {
      productQuantity: cartProductPackagingQuantity,
      amount: cartProductPackagingAmount,
    };
    await this.apiService.addOneCartProductPackaging(
      cartProductPackaging.id,
      patchQuantityPrice
    );
    this.getCartProductPackagings();
  }

  async deleteOneCartProductPackaging(
    cartProductPackaging: CartProductPackaging
  ): Promise<void> {
    if (cartProductPackaging.productQuantity > 0) {
      const cartProductPackagingQuantity =
        cartProductPackaging.productQuantity - 1;

      const cartProductPackagingAmount =
        cartProductPackagingQuantity *
        cartProductPackaging.productPackaging.unitPrice;
      const patchQuantityPrice: PatchQuantityPrice = {
        productQuantity: cartProductPackagingQuantity,
        amount: cartProductPackagingAmount,
      };
      await this.apiService.addOneCartProductPackaging(
        cartProductPackaging.id,
        patchQuantityPrice
      );
      this.getCartProductPackagings();
    }
  }

  async deleteCartProductPackaging(
    cartProductPackaging: CartProductPackaging
  ): Promise<void> {
    await this.apiService.deleteCartProductPackaging(cartProductPackaging);
    this.getCartProductPackagings();
  }

  getMainOrders(): void {
    this.apiService.getMainOrders().then((hydraMainOrder: HydraMainOrder) => {
      this.mainOrders = hydraMainOrder['hydra:member'];
      this.mainOrders.forEach((mainOrder: MainOrder) => {
        mainOrder.showByUser = false;
        mainOrder.showByProduct = false;
      });
    });
  }

  onRefreshMainOrdersEvent() {
    this.getMainOrders();
    this.getOrders();
  }

  refreshOrders() {
    this.getOrders();
    this.getMainOrders();
  }
}
