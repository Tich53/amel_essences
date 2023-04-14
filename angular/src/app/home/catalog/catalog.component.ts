import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/_interfaces/product';
import { ProductPackaging } from 'src/app/_interfaces/product-packaging';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  @Input() products?: Product[];
  selectedPackagingId = 0;

  constructor() {}

  ngOnInit() {}

  getUnitPrice(product: Product): number {
    // const selectElement = document.getElementById(
    //   `product-packaging-${product.id}`
    // ) as HTMLSelectElement;
    // const selectedOption = parseInt(selectElement?.selectedOptions[0].value);

    // for (const productPackaging of product.productPackagings) {
    //   if (productPackaging.id === selectedOption) {
    //     return `${productPackaging.unitPrice} €`;
    //   } else {
    //     return `${productPackaging.unitPrice} €`;
    //   }
    // }
    
    return product.selectedProductPackaging?.unitPrice;
  }

  // onSelectChange(selectedProduct: Product): void {
  //   console.log(selectedProduct);
  //   const selectElement = document.getElementById(
  //     `product-packaging-${selectedProduct.id}`
  //   ) as HTMLSelectElement;
  //   const selectedOption = parseInt(selectElement?.selectedOptions[0].value);
  //   const unitPriceElement = document.getElementById(
  //     `unit-price-${selectedProduct.id}`
  //   );

  //   for (const productPackaging of selectedProduct.productPackagings) {
  //     if (productPackaging.id === selectedOption) {
  //       selectedProduct.selectedProductPackaging = productPackaging;
  //       if (unitPriceElement)
  //         unitPriceElement.innerHTML = `${productPackaging.unitPrice.toString()} €`;
  //     }
  //   }
  // }

  addToCart(product: Product) {
    console.log(product);
  }
}
