import { Component, Input, OnInit } from '@angular/core';
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

  @Input() products?: Product[];

  selectedProductPackaging?: ProductPackaging;
  count = 0;

  constructor() {}

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
