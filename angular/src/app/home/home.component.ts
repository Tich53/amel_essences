import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProductPackaging } from '../_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { Product } from '../_interfaces/product';
import { HydraCartProductPackaging } from '../_interfaces/_hydras/hydra-cart-product-packaging';
import { HydraProduct } from '../_interfaces/_hydras/hydra-product';
import { ApiService } from '../_services/api/api.service';
import { PatchQuantityPrice } from '../_interfaces/_patches/patch-quantity-price';
import { CurrentUser } from '../_interfaces/_abstracts/user/current-user';
import { HydraOrder } from '../_interfaces/_hydras/hydra-order';
import { Order } from '../_interfaces/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser!: CurrentUser;

  productSubscription?: Subscription;

  products?: Product[];
  productNumber = 0;

  cartProductPackagings?: CartProductPackaging[];
  cartProductQuantity = 0;

  orders?: Order[];
  pendingOrderNumber = 0;

  hasAddedCartProductPackaging?: boolean;

  menuItemSelection = {
    catalogActive: false,
    orderActive: false,
    cartActive: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService
      .getCurrentUser()
      .then((currentUser) => (this.currentUser = currentUser));
    this.getProducts();
    this.getCartProductPackagings();
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

  getProducts() {
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

  getCartProductPackagings() {
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

  async getOrders() {
    const now = new Date();
    await this.apiService.getOrders().then((hydraOrder: HydraOrder) => {
      this.orders = hydraOrder['hydra:member'];
      this.pendingOrderNumber = 0;
      this.orders.forEach((order: Order) => {
        order.show = false;
        if (!order.mainOrder || now < order.mainOrder.closingDate) {
          this.pendingOrderNumber++;
        }
      });
    });
  }

  async addOneCartProductPackaging(cartProductPackaging: CartProductPackaging) {
    const cartProductPackagingQuantity =
      cartProductPackaging.productQuantity + 1;

    const cartProductPackagingAmount =
      cartProductPackagingQuantity *
      cartProductPackaging.productPackaging.unitPrice;
    console.log(cartProductPackagingAmount);
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
  ) {
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

  async deleteCartProductPackaging(cartProductPackaging: CartProductPackaging) {
    await this.apiService.deleteCartProductPackaging(cartProductPackaging);
    this.getCartProductPackagings();
  }
}
