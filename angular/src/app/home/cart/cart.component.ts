import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/_interfaces/_abstract/cart-product/cart-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() cartProducts?: CartProduct[];

  constructor() {}

  ngOnInit(): void {}
}
