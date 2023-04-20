import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/_abstract/cart-product-packaging/cart-product-packaging';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() cartProductPackagings?: CartProductPackaging[];
  selectedCartProductPackagings?: CartProductPackaging[];
  totalCartAmount = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.getTotalCartAmount();
  }

  getTotalCartAmount() {
    // Copy of the cartProductPackaging
    this.selectedCartProductPackagings = this.cartProductPackagings?.map(
      (x) => x
    );
    this.totalCartAmount = 0;
    if (this.selectedCartProductPackagings) {
      for (const selectedCartProductPackaging of this
        .selectedCartProductPackagings) {
        this.totalCartAmount += selectedCartProductPackaging.amount;
      }
    }
  }

  onCheck(event: any, cartProductPackaging: CartProductPackaging) {
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
    console.log(this.cartProductPackagings);
    console.log(this.selectedCartProductPackagings);
  }
}
