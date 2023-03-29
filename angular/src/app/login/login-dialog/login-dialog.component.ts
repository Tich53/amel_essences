import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  readonly status = {
    validated: 'Validé',
    pending: 'En attente',
    denied: 'Refusé',
  };

  currentUserStatus?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: {
      currentUserStatus: string;
    }
  ) {
    this.currentUserStatus = data.currentUserStatus;
  }

  ngOnInit(): void {
    console.log(this.currentUserStatus);
    if (this.currentUserStatus === this.status.pending) {
      console.log('Les variables sont correctes');
    }
  }
}
