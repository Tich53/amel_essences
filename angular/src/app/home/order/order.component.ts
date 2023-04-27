import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/_interfaces/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() orders?: Order[];

  constructor() {}

  ngOnInit(): void {}
}
