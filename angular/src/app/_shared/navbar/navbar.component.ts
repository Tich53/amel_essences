import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavbarDialogComponent } from './navbar-dialog/navbar-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  catalogActive = false;
  orderActive = false;
  name?: string;
  constructor(public router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = 'fit-content';
    dialogConfig.width = '90%';
    dialogConfig.enterAnimationDuration;
    dialogConfig.exitAnimationDuration;
    this.dialog.open(NavbarDialogComponent, dialogConfig);
  }
}
