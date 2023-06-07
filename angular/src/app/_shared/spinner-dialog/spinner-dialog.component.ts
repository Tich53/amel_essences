import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.scss'],
})
export class SpinnerDialogComponent implements OnInit {
  showSpinner = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: {
      showSpinner: boolean;
    }
  ) {
    this.showSpinner = data.showSpinner;
  }

  ngOnInit(): void {}
}
