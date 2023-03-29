import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  name: string;
  emailExists: boolean;
  error: boolean;

  // public dialogRef: MatDialogRef<RegisterDialogComponent>
  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: { name: string; error: boolean; emailExists: boolean },
    private router: Router
  ) {
    this.name = data.name.trim();
    this.error = data.error;
    this.emailExists = data.emailExists;
  }

  ngOnInit(): void {}
}
