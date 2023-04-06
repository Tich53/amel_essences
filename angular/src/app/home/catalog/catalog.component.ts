import { Component, OnInit } from '@angular/core';
import { Packaging } from 'src/app/_interfaces/packaging';
import { Product } from 'src/app/_interfaces/product';
import { ProductPackaging } from 'src/app/_interfaces/product-packaging';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  selectedProductPackaging?: ProductPackaging;
  products: any[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.apiService.getProducts();
  }

  getProductPackaging(event: any, product: Product): void {
    const selectedCapacity = parseInt(event.target.value);
    for (const productPackaging of product.productPackagings) {
      if (productPackaging.packaging.capacity === selectedCapacity) {
        console.log(productPackaging);
        this.selectedProductPackaging = productPackaging;
      }
    }
  }

  getUnitPrice(product: Product): number | void {
    if (this.selectedProductPackaging) {
      if (product.productPackagings.includes(this.selectedProductPackaging)) {
        return this.selectedProductPackaging.unitPrice;
      } else {
        return product.productPackagings[0].unitPrice;
      }
    } else {
      return product.productPackagings[0].unitPrice;
    }
  }

  addToCart(product: Product) {
    console.log(product);
  }
}
