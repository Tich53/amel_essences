import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MainOrder } from 'src/app/_interfaces/main-order';
import { User } from 'src/app/_interfaces/_abstracts/user/user';
import { MainOrderDialogComponent } from './main-order-dialog/main-order-dialog.component';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrls: ['./main-order.component.scss'],
})
export class MainOrderComponent implements OnInit {
  @Input() currentUser?: User;
  @Input() mainOrders?: MainOrder[];

  readonly roleAdmin = 'ROLE_ADMIN';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  isAdmin(): boolean {
    if (this.currentUser?.roles.includes(this.roleAdmin)) {
      return true;
    }
    return false;
  }

  mainOrderPending(): boolean {
    const now = new Date();
    if (this.mainOrders) {
      for (const mainOrder of this.mainOrders) {
        if (
          Date.parse(mainOrder.closingDate.toString()) >
          Date.parse(now.toString())
        ) {
          return true;
        }
      }
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
    this.dialog.open(MainOrderDialogComponent, dialogConfig);
  }
}
