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
  //  private dialogRef: MatDialogRef<DialogComponent>,

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { name: string },
    private router: Router
  ) {
    this.name = data.name;
    console.log(this.name);
  }

  ngOnInit(): void {}

  onClose() {
    this.router.navigate(['/login']);
  }
}
