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

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
})
export class RecapComponent implements OnInit, OnChanges {
  @Input() mainOrders?: MainOrder[];

  orderItemsByUser: OrderItem[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mainOrders']) {
      this.mainOrders?.sort((a, b) => b.id - a.id);
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
    console.log(userByOrderItem);
    return userByOrderItem;
  }
}
