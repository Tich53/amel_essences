import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/cart-product-packaging';
import { PostCartProductPackaging } from 'src/app/_interfaces/_posts/post-cart-product-packaging';
import { User } from 'src/app/_interfaces/user';
import { Product } from 'src/app/_interfaces/product';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  @Input() currentUser?: User;
  @Input() products?: Product[];
  @Input() cartProductPackagings?: CartProductPackaging[];
  @Output() hasAddedCartProductEvent = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  async addToCart(product: Product): Promise<void> {
    if (this.currentUser) {
      const cartIri = '/api/carts/';
      const productPackagingIri = '/api/product_packagings/';
      if (this.getCartProductPackagingId(product)) {
        const cartProductPackagingId = this.getCartProductPackagingId(product);
        const cartProductQuantity =
          this.getCartProductPackagingQuantity(product) + 1;
        const cartProductPrice =
          cartProductQuantity * product.selectedProductPackaging.unitPrice;
        const PatchQuantityPrice = {
          productQuantity: cartProductQuantity,
          amount: cartProductPrice,
        };

        await this.apiService.addOneCartProductPackaging(
          cartProductPackagingId as number,
          PatchQuantityPrice
        );
      } else {
        const cartProductPackaging: PostCartProductPackaging = {
          amount: product.selectedProductPackaging.unitPrice,
          cart: `${cartIri}${this.currentUser.cart.id}`,
          productPackaging: `${productPackagingIri}${product.selectedProductPackaging.id}`,
          productQuantity: 1,
        };
        await this.apiService.postCartProductPackaging(cartProductPackaging);
      }
      this.hasAddedCartProductEvent.emit();
    }
  }

  getCartProductQuantity(product: Product): number {
    let quantity = 0;
    if (this.cartProductPackagings) {
      const filteredCartProductPackagings = this.cartProductPackagings.filter(
        (cartProductPackaging) =>
          cartProductPackaging.productPackaging.product.id === product.id
      );
      for (const filteredCartProductPackaging of filteredCartProductPackagings) {
        quantity += filteredCartProductPackaging.productQuantity;
      }
      return quantity;
    }
    return 0;
  }

  getCartProductPackagingId(product: Product): number | void {
    if (this.cartProductPackagings) {
      const filteredCartProductPackagings = this.cartProductPackagings.filter(
        (cartProductPackaging) =>
          cartProductPackaging.productPackaging.id ===
          product.selectedProductPackaging.id
      );
      if (filteredCartProductPackagings.length > 0) {
        return filteredCartProductPackagings[0].id;
      }
    }
  }

  getCartProductPackagingQuantity(product: Product): number {
    let quantity = 0;
    if (this.cartProductPackagings) {
      const filteredCartProductPackagings = this.cartProductPackagings.filter(
        (cartProductPackaging) =>
          cartProductPackaging.productPackaging.id ===
          product.selectedProductPackaging.id
      );
      for (const filteredCartProductPackaging of filteredCartProductPackagings) {
        quantity = filteredCartProductPackaging.productQuantity;
      }
      return quantity;
    }
    return 0;
  }
}
