import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductIri } from 'src/app/_interfaces/_abstract/cart-product/cart-product-iri';
import { CurrentUser } from 'src/app/_interfaces/_abstract/user/current-user';
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
  @Output() hasAddedCartProductEvent = new EventEmitter();

  currentUser!: CurrentUser;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.apiService
      .getCurrentUser()
      .then((currentUser) => (this.currentUser = currentUser));
  }

  addToCart(product: Product): void {
    const cartIri = '/api/carts/';
    const productIri = '/api/products/';
    const cartProduct: CartProductIri = {
      amount: product.selectedProductPackaging.unitPrice,
      cart: `${cartIri}${this.currentUser.cart.id}`,
      product: `${productIri}${product.id}`,
      productQuantity: 1,
    };
    this.apiService.addToCart(cartProduct);
    this.hasAddedCartProductEvent.emit();
  }
}
