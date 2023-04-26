import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { CurrentUser } from 'src/app/_interfaces/_abstracts/user/current-user';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() currentUser!: CurrentUser;
  @Input() cartProductPackagings?: CartProductPackaging[];
  @Output() hasDeletedEvent = new EventEmitter<CartProductPackaging>();
  @Output() hasAddedOneEvent = new EventEmitter<CartProductPackaging>();
  @Output() hasDeletedOneEvent = new EventEmitter<CartProductPackaging>();

  selectedCartProductPackagings?: CartProductPackaging[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartProductPackagings']) {
      // Copy of the cartProductPackaging
      this.selectedCartProductPackagings = this.cartProductPackagings?.slice();
    }
  }

  getTotalCartAmount(): number {
    let totalCartAmount = 0;
    if (this.selectedCartProductPackagings) {
      for (const selectedCartProductPackaging of this
        .selectedCartProductPackagings) {
        totalCartAmount += selectedCartProductPackaging.amount;
      }
    }
    return totalCartAmount;
  }

  onCheck(event: any, cartProductPackaging: CartProductPackaging): void {
    const isSelected = event.target.checked;
    if (isSelected) {
      if (!this.selectedCartProductPackagings?.includes(cartProductPackaging)) {
        this.selectedCartProductPackagings?.push(cartProductPackaging);
      }
    }
    if (!isSelected) {
      const index =
        this.selectedCartProductPackagings?.indexOf(cartProductPackaging);
      if (index !== undefined) {
        this.selectedCartProductPackagings?.splice(index, 1);
      }
    }
  }

  addOne(cartProductPackaging: CartProductPackaging): void {
    this.hasAddedOneEvent.emit(cartProductPackaging);
  }

  deleteOne(cartProductPackaging: CartProductPackaging): void {
    this.hasDeletedOneEvent.emit(cartProductPackaging);
  }

  delete(cartProductPackaging: CartProductPackaging): void {
    this.hasDeletedEvent.emit(cartProductPackaging);
  }

  async validateCart() {
    const userIri = 'https://localhost:8000/api/users/';
    const currentUserId = this.currentUser.id;
    const order = {
      amount: 0,
      userAccount: `${userIri}${currentUserId}`,
    };
    await this.apiService.createOrder(order);

    const hydraOrders = await this.apiService.getOrders();
    const orders = hydraOrders['hydra:member'];
    const currentOrderId = orders.at(-1)?.id;

    if (this.selectedCartProductPackagings) {
      for (const selectedCartProductPackaging of this
        .selectedCartProductPackagings) {
        const orderIri = `https://localhost:8000/api/orders/${currentOrderId}`;
        const cartProductPackagingIri = `https://localhost:8000/api/cart_product_packagings/${selectedCartProductPackaging.id}`;
        const orderCartProductPackaging = {
          orderNumber: orderIri,
          cartProductPackaging: cartProductPackagingIri,
        };
        this.apiService.validateSelectedCartProductPackagings(
          orderCartProductPackaging
        );
      }
    }
    // Once all cartProductPackaging added, compute the total amount & patch the order Amount
    // Once order created, delete the cartProductPackaging
  }
}
