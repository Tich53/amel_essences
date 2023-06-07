import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit {
  name: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: { name: string },
    private router: Router
  ) {
    this.name = data.name.trim();
  }

  ngOnInit(): void {}
}
