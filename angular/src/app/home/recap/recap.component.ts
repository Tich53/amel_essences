import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/app/_interfaces/_abstracts/user/user';
import { MainOrder } from 'src/app/_interfaces/main-order';
import { OrderItem } from 'src/app/_interfaces/order-item';
import { Product } from 'src/app/_interfaces/product';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
})
export class RecapComponent implements OnInit, OnChanges {
  @Input() mainOrders?: MainOrder[];

  showUser = true;
  showProduct = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mainOrders']) {
      this.mainOrders?.sort((a, b) => b.id - a.id);
      console.log(this.mainOrders);
    }
  }

  ngOnInit(): void {}

  isPending(mainOrder: MainOrder): boolean {
    const now = new Date();
    if (
      Date.parse(now.toString()) < Date.parse(mainOrder.closingDate.toString())
    ) {
      return true;
    }
    return false;
  }

  onClickShowUser(mainOrder: MainOrder) {
    mainOrder.showByUser = true;
    mainOrder.showByProduct = false;
  }

  onClickShowProduct(mainOrder: MainOrder) {
    mainOrder.showByUser = false;
    mainOrder.showByProduct = true;
  }

  onClickHide(mainOrder: MainOrder) {
    mainOrder.showByUser = false;
    mainOrder.showByProduct = false;
  }

  setShowUserClasses(mainOrder: MainOrder): string | void {
    if (mainOrder.showByUser) {
      return 'bg-primary white';
    }
  }

  setShowProductClasses(mainOrder: MainOrder): string | void {
    if (mainOrder.showByProduct) {
      return 'bg-primary white';
    }
  }

  setHideClasses(mainOrder: MainOrder): string | void {
    if (!mainOrder.showByUser && !mainOrder.showByProduct) {
      return 'bg-secondary white';
    }
  }

  getOrderItemsByUser(mainOrder: MainOrder): Map<User, OrderItem[]> {
    const userByOrderItem = new Map<User, OrderItem[]>();
    for (const order of mainOrder.orders) {
      for (const orderItem of order.orderItems) {
        const user = Array.from(userByOrderItem.keys()).find(
          (u) => u.id === order.userAccount.id
        );
        let orderItems: OrderItem[] | undefined;
        if (user) {
          orderItems = userByOrderItem.get(user);
        }
        if (!orderItems) {
          orderItems = [];
          userByOrderItem.set(order.userAccount, orderItems);
        }
        orderItems.push(orderItem);
      }
    }
    return userByOrderItem;
  }

  getOrderItemsByProduct(mainOrder: MainOrder): Map<Product, OrderItem[]> {
    const productByOrderItem = new Map<Product, OrderItem[]>();
    for (const order of mainOrder.orders) {
      for (const orderItem of order.orderItems) {
        const product = Array.from(productByOrderItem.keys()).find(
          (p) => p.id === orderItem.productPackaging.product.id
        );
        let orderItems: OrderItem[] | undefined;
        if (product) {
          orderItems = productByOrderItem.get(product);
        }
        if (!orderItems) {
          orderItems = [];
          productByOrderItem.set(
            orderItem.productPackaging.product,
            orderItems
          );
        }
        orderItems.push(orderItem);
      }
    }
    return productByOrderItem;
  }
}
