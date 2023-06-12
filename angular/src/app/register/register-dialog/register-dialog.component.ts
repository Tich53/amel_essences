import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  name: string;
  emailExists: boolean;
  error: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: {
      name: string;
      error: boolean;
      emailExists: boolean;
    }
  ) {
    this.name = data.name.trim();
    this.error = data.error;
    this.emailExists = data.emailExists;
  }

  ngOnInit(): void {}
}
