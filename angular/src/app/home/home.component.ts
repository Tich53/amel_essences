import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../_interfaces/product';
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

  products?: Product[];
  productNumber = 0;
  productSubscription?: Subscription;

  menuItemSelection = {
    catalogActive: false,
    orderActive: false,
    cartActive: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
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
            this.products = [hydraProduct[this.hydraMember][0]];
            this.productNumber = hydraProduct[this.hydraTotalItem];
            this.products.forEach((product)=>product.selectedProductPackaging=product.productPackagings?.[0])
          });
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
