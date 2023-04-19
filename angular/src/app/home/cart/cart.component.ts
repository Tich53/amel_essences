import { Component, Input, OnInit } from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/_abstract/cart-product-packaging/cart-product-packaging';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() cartProductPackagings?: CartProductPackaging[];

  constructor() {}

  ngOnInit(): void {}
}
