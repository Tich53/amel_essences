import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/_interfaces/_abstracts/user/current-user';
import { ApiService } from 'src/app/_services/api/api.service';
import { StorageService } from 'src/app/_services/authentication/storage.service';
import { NavbarDialogComponent } from './navbar-dialog/navbar-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() cartProductQuantity = 0;
  @Output() menuItemSelectionEmitter = new EventEmitter<{
    catalogActive: boolean;
    orderActive: boolean;
    cartActive: boolean;
  }>();

  catalogActive = true;
  orderActive = false;
  cartActive = false;

  currentUser?: CurrentUser;
  name!: string;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.menuItemSelectionEmitter.emit({
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
    });
  }

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

  async getCurrentUser(): Promise<string> {
    this.currentUser = await this.apiService.getCurrentUser().then();
    return (this.name = this.currentUser?.name);
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }

  onClickCatalog() {
    this.catalogActive = true;
    this.orderActive = false;
    this.cartActive = false;
    this.menuItemSelectionEmitter.emit({
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
    });
  }

  onClickMyOrders() {
    this.catalogActive = false;
    this.orderActive = true;
    this.cartActive = false;
    this.menuItemSelectionEmitter.emit({
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
    });
  }

  onClickMyCart() {
    this.catalogActive = false;
    this.orderActive = false;
    this.cartActive = true;
    this.menuItemSelectionEmitter.emit({
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
    });
  }
}
