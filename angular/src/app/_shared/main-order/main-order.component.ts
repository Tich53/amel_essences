import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { MainOrder } from 'src/app/_interfaces/main-order';
import { User } from 'src/app/_interfaces/_abstracts/user/user';
import { MainOrderDialogComponent } from './main-order-dialog/main-order-dialog.component';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrls: ['./main-order.component.scss'],
})
export class MainOrderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() currentUser?: User;
  @Input() mainOrders?: MainOrder[];
  @Output() refreshMainOrdersEvent = new EventEmitter();

  readonly roleAdmin = 'ROLE_ADMIN';

  private timeDifferenceSubscription?: Subscription;
  private afterClosedSubscription?: Subscription;

  pendingMainOrder?: MainOrder;
  closingDate?: Date;
  dateNow = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  timeDifference = 0;
  secondsToClosingDate = 0;
  minutesToClosingDate = 0;
  hoursToClosingDate = 0;
  daysToClosingDate = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mainOrders']) {
      const date = new Date();
      this.pendingMainOrder = this.mainOrders
        ?.filter(
          (mainOrder) =>
            Date.parse(mainOrder.closingDate.toString()) >
            Date.parse(date.toString())
        )
        .at(-1);
      this.closingDate = this.pendingMainOrder?.closingDate;

      // Subscribe au countdown uniquement si une commande principale existe et unsubscribe dès que le compteur arrive à zéro.
      if (this.pendingMainOrder) {
        this.timeDifferenceSubscription = interval(1000).subscribe((x) => {
          this.getTimeDifference();
        });
      } else {
        this.timeDifferenceSubscription?.unsubscribe();
      }
    }
  }

  ngOnDestroy(): void {
    this.timeDifferenceSubscription?.unsubscribe();
    this.afterClosedSubscription?.unsubscribe();
  }

  private getTimeDifference() {
    if (this.closingDate) {
      this.timeDifference =
        Date.parse(this.closingDate.toString()) -
        Date.parse(new Date().toString());
    }
    this.allocateTimeUnits(this.timeDifference);
    if (this.timeDifference <= 0) {
      this.refreshMainOrdersEvent.emit();
    }
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToClosingDate = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToClosingDate = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToClosingDate = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToClosingDate = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  isAdmin(): boolean {
    if (this.currentUser?.roles.includes(this.roleAdmin)) {
      return true;
    }
    return false;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = 'fit-content';
    dialogConfig.width = '350px';
    dialogConfig.enterAnimationDuration;
    dialogConfig.exitAnimationDuration;
    let currentDialog = this.dialog.open(
      MainOrderDialogComponent,
      dialogConfig
    );
    this.afterClosedSubscription = currentDialog
      .afterClosed()
      .subscribe(() => this.refreshMainOrdersEvent.emit());
  }
}
