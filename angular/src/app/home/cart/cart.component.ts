import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/_abstract/cart-product-packaging/cart-product-packaging';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() cartProductPackagings?: CartProductPackaging[];
  selectedCartProductPackagings?: CartProductPackaging[];

  constructor() {}

  ngOnInit(): void {
    // Copy of the cartProductPackaging
    this.selectedCartProductPackagings = this.cartProductPackagings?.map(
      (x) => x
    );
  }

  ngOnChanges(): void {
    this.getTotalCartAmount();
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
}
