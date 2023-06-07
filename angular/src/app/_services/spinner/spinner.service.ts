import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SpinnerDialogComponent } from 'src/app/_shared/spinner-dialog/spinner-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  count = 0;

  constructor(private dialog: MatDialog) {}

  show() {
    if (this.count === 0) {
      this.openSpinner();
    }
    this.count++;
  }

  hide() {
    this.count--;
    if (this.count === 0) {
      this.closeSpinner();
    }
  }

  openSpinner(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '160px';
    dialogConfig.width = '160px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.panelClass = 'spinner-dialog';
    dialogConfig.enterAnimationDuration;
    dialogConfig.exitAnimationDuration;
    dialogConfig.data = {
      showSpinner: true,
    };
    this.dialog.open(SpinnerDialogComponent, dialogConfig);
  }

  closeSpinner(): void {
    this.dialog.closeAll();
  }
}
