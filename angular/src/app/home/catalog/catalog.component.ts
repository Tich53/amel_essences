import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { CartProductPackagingIri } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging-iri';
import { CurrentUser } from 'src/app/_interfaces/_abstracts/user/current-user';
import { Product } from 'src/app/_interfaces/product';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  readonly hydraMember = 'hydra:member';

  @Input() products?: Product[];
  @Input() cartProductPackagings?: CartProductPackaging[];
  @Output() hasAddedCartProductEvent = new EventEmitter();

  currentUser!: CurrentUser;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getCurrentUser()
      .then((currentUser) => (this.currentUser = currentUser));
  }

  addToCart(product: Product): void {
    const cartIri = '/api/carts/';
    const productPackagingIri = '/api/product_packagings/';
    const cartProductPackaging: CartProductPackagingIri = {
      amount: product.selectedProductPackaging.unitPrice,
      cart: `${cartIri}${this.currentUser.cart.id}`,
      productPackaging: `${productPackagingIri}${product.selectedProductPackaging.id}`,
      productQuantity: 1,
    };

    if (this.getCartProductPackagingId(product) > -1) {
      const cartProductPackagingId = this.getCartProductPackagingId(product);
      const cartProductQuantity =
        this.getCartProductPackagingQuantity(product) + 1;
      const cartProductPrice =
        cartProductQuantity * product.selectedProductPackaging.unitPrice;
      const PatchQuantityPrice = {
        productQuantity: cartProductQuantity,
        amount: cartProductPrice,
      };

      this.apiService.addOneCartProductPackaging(
        cartProductPackagingId,
        PatchQuantityPrice
      );
      this.hasAddedCartProductEvent.emit();
    } else {
      this.apiService.postCartProductPackaging(cartProductPackaging);
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

  getCartProductPackagingId(product: Product): number {
    let id = -1;
    if (this.cartProductPackagings) {
      const filteredCartProductPackagings = this.cartProductPackagings.filter(
        (cartProductPackaging) =>
          cartProductPackaging.productPackaging.id ===
          product.selectedProductPackaging.id
      );
      if (filteredCartProductPackagings.length > 0) {
        id = filteredCartProductPackagings[0].id;
      }
    }
    return id;
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
        quantity += filteredCartProductPackaging.productQuantity;
      }
      return quantity;
    }
    return 0;
  }
}
