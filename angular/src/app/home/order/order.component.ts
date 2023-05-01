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

  showOrder(order: Order) {
    order.show = !order.show;
  }

  isPendingOrder(order: Order): boolean {
    const now = new Date();
    if (!order.mainOrder || now < order.mainOrder.closingDate) {
      return true;
    }
    return false;
  }

  delete(order: Order) {
    this.hasDeletedOrderEvent.emit(order);
  }
}
