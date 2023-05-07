import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MainOrder } from 'src/app/_interfaces/main-order';
import { CartProductPackaging } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { User } from 'src/app/_interfaces/_abstracts/user/user';
import { HydraMainOrder } from 'src/app/_interfaces/_hydras/hydra-main-order';
import { PatchOrder } from 'src/app/_interfaces/_patches/patch-order';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() currentUser!: User;
  @Input() cartProductPackagings?: CartProductPackaging[];
  @Output() hasDeletedEvent = new EventEmitter<CartProductPackaging>();
  @Output() hasAddedOneEvent = new EventEmitter<CartProductPackaging>();
  @Output() hasDeletedOneEvent = new EventEmitter<CartProductPackaging>();
  @Output() hasValidatedCartEvent = new EventEmitter();

  selectedCartProductPackagings?: CartProductPackaging[];
  mainOrders?: MainOrder[];

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
    const userIri = 'https://localhost:8000/api/users';
    const currentUserId = this.currentUser.id;

    // Get mainOrders
    await this.apiService
      .getMainOrders()
      .then((hydraMainOrder: HydraMainOrder) => {
        this.mainOrders = hydraMainOrder['hydra:member'];
      });

    // Get the pending main order if exists
    const now = new Date();
    const pendingMainOrders = this.mainOrders?.filter(
      (mainOrder) =>
        Date.parse(mainOrder.closingDate.toString()) >
        Date.parse(now.toString())
    );

    if (pendingMainOrders) {
      console.log('pendingMainOrders :', pendingMainOrders);
      const pendingMainOrder = pendingMainOrders?.at(-1);

      if (pendingMainOrder) {
        const mainOrderIri = 'https://localhost:8000/api/main_orders';
        const mainOrderId = pendingMainOrder.id;
        const order = {
          productQuantity: 0,
          amount: 0,
          userAccount: `${userIri}/${currentUserId}`,
          mainOrder: `${mainOrderIri}/${mainOrderId}`,
        };
        await this.apiService.createOrder(order);
      }
    } else {
      const order = {
        productQuantity: 0,
        amount: 0,
        userAccount: `${userIri}${currentUserId}`,
      };
      await this.apiService.createOrder(order);
    }

    const hydraOrders = await this.apiService.getOrders();
    const orders = hydraOrders['hydra:member'];
    const currentOrderId = orders.at(-1)!.id;

    let orderAmount = 0;
    let orderProductQuantity = 0;
    if (this.selectedCartProductPackagings) {
      for (const selectedCartProductPackaging of this
        .selectedCartProductPackagings) {
        const orderIri = `https://localhost:8000/api/orders/${currentOrderId}`;
        const productPackagingIri = `https://localhost:8000/api/product_packagings/${selectedCartProductPackaging.productPackaging.id}`;
        const orderItem = {
          amount: selectedCartProductPackaging.amount,
          orderNumber: orderIri,
          productPackaging: productPackagingIri,
          productQuantity: selectedCartProductPackaging.productQuantity,
        };
        await this.apiService.validateSelectedCartProductPackagings(orderItem);
        orderAmount += selectedCartProductPackaging.amount;
        orderProductQuantity += selectedCartProductPackaging.productQuantity;
        this.delete(selectedCartProductPackaging);
      }
      const patchOrder: PatchOrder = {
        productQuantity: orderProductQuantity,
        amount: orderAmount,
      };
      await this.apiService.patchOrderAmount(currentOrderId, patchOrder);
      this.hasValidatedCartEvent.emit();
    }
  }
}
