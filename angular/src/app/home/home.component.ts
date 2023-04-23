import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProductPackaging } from '../_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { Product } from '../_interfaces/product';
import { HydraCartProductPackaging } from '../_interfaces/_hydras/hydra-cart-product-packaging';
import { HydraProduct } from '../_interfaces/_hydras/hydra-product';
import { ApiService } from '../_services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly hydraMember = 'hydra:member';
  readonly hydraTotalItem = 'hydra:totalItems';

  productSubscription?: Subscription;

  products?: Product[];
  productNumber = 0;

  cartProductPackagings?: CartProductPackaging[];
  cartProductQuantity = 0;

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
    this.getProducts();
    this.getCartProductPackagings();
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
            this.products = hydraProduct[this.hydraMember];
            this.productNumber = hydraProduct[this.hydraTotalItem];
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
        this.cartProductPackagings =
          HydraCartProductPackaging[this.hydraMember];
        this.cartProductQuantity =
          HydraCartProductPackaging[this.hydraTotalItem];
      });
  }
}
