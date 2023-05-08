import { NodeWithI18n } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/_interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() orders?: Order[];
  @Output() hasDeletedOrderEvent = new EventEmitter<Order>();

  constructor() {}

  ngOnInit(): void {}

  showOrderItems(order: Order) {
    order.show = !order.show;
  }

  isPending(order: Order): boolean {
    const now = new Date();
    if (
      !order.mainOrder ||
      Date.parse(now.toString()) <
        Date.parse(order.mainOrder.closingDate.toString())
    ) {
      return true;
    }
    return false;
  }

  delete(order: Order) {
    this.hasDeletedOrderEvent.emit(order);
  }
}
