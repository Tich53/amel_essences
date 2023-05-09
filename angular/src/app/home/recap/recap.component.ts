import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MainOrder } from 'src/app/_interfaces/main-order';
import { Order } from 'src/app/_interfaces/order';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
})
export class RecapComponent implements OnInit, OnChanges {
  @Input() mainOrders?: MainOrder[];

  orders: Order[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mainOrders']) {
      console.log(this.mainOrders);
    }
  }

  ngOnInit(): void {}
}
