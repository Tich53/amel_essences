import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_interfaces/product';
import { ProductPackaging } from 'src/app/_interfaces/product-packaging';
import { HydraProduct } from 'src/app/_interfaces/_hydras/hydra-product';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  selectedProductPackaging?: ProductPackaging;
  products?: Product[];
  count = 0;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
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
        .subscribe((hydraProduct: HydraProduct) => {
          this.products = hydraProduct[this.hydraMember];
        });
    });
  }

  ngOnInit() {}

  getUnitPrice(product: Product): string | void {
    const selectElement = document.getElementById(
      `product-packaging-${product.id}`
    ) as HTMLSelectElement;
    const selectedOption = parseInt(selectElement?.selectedOptions[0].value);

    for (const productPackaging of product.productPackagings) {
      if (productPackaging.id === selectedOption) {
        return `${productPackaging.unitPrice} €`;
      } else {
        return `${productPackaging.unitPrice} €`;
      }
    }
  }

  onSelectChange(selectedProduct: Product): void {
    const selectElement = document.getElementById(
      `product-packaging-${selectedProduct.id}`
    ) as HTMLSelectElement;
    const selectedOption = parseInt(selectElement?.selectedOptions[0].value);
    const unitPriceElement = document.getElementById(
      `unit-price-${selectedProduct.id}`
    );

    for (const productPackaging of selectedProduct.productPackagings) {
      if (productPackaging.id === selectedOption) {
        if (unitPriceElement)
          unitPriceElement.innerHTML = `${productPackaging.unitPrice.toString()} €`;
      }
    }
  }

  addToCart(product: Product) {
    console.log(product);
  }
}
