import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CartProductPackaging } from 'src/app/_interfaces/_abstracts/cart-product-packaging/cart-product-packaging';
import { ApiService } from 'src/app/_services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() cartProductPackagings?: CartProductPackaging[];
  @Output() hasDeletedCartProductEvent = new EventEmitter();

  selectedCartProductPackagings?: CartProductPackaging[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartProductPackagings']) {
      // Copy of the cartProductPackaging
      this.selectedCartProductPackagings = this.cartProductPackagings?.slice();
    }
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

  deleteCartProductPackaging(cartProductPackaging: CartProductPackaging): void {
    this.apiService.deleteCartProductPackaging(cartProductPackaging);

    if (this.cartProductPackagings) {
      const index = this.cartProductPackagings?.indexOf(cartProductPackaging);
      this.cartProductPackagings?.splice(index, 1);
    }

    if (this.selectedCartProductPackagings) {
      const index =
        this.selectedCartProductPackagings?.indexOf(cartProductPackaging);
      this.selectedCartProductPackagings?.splice(index, 1);
    }
  }
}
