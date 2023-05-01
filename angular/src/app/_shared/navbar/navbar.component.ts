import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/_interfaces/_abstracts/user/user';
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
  @Input() pendingOrderNumber = 0;
  @Input() waitingListNumber = 0;
  @Output() menuItemSelectionEmitter = new EventEmitter<{
    adminActive: boolean;
    catalogActive: boolean;
    orderActive: boolean;
    cartActive: boolean;
    waitingListActive: boolean;
  }>();

  readonly roleAdmin = 'ROLE_ADMIN';
  readonly adminPanel = 'https://localhost:8000/admin';

  adminActive = false;
  catalogActive = true;
  orderActive = false;
  cartActive = false;
  waitingListActive = false;

  currentUser?: User;
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
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
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
    console.log(this.currentUser);
    return (this.name = this.currentUser?.name);
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }

  onClickAdmin() {
    this.adminActive = true;
    this.catalogActive = false;
    this.orderActive = false;
    this.cartActive = false;
    this.waitingListActive = false;
    this.menuItemSelectionEmitter.emit({
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
    });
  }

  onClickCatalog() {
    this.adminActive = false;
    this.catalogActive = true;
    this.orderActive = false;
    this.cartActive = false;
    this.waitingListActive = false;
    this.menuItemSelectionEmitter.emit({
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
    });
  }

  onClickWaitingList() {
    this.adminActive = false;
    this.catalogActive = false;
    this.orderActive = false;
    this.cartActive = false;
    this.waitingListActive = true;
    this.menuItemSelectionEmitter.emit({
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
    });
  }

  onClickMyOrders() {
    this.adminActive = false;
    this.catalogActive = false;
    this.orderActive = true;
    this.cartActive = false;
    this.waitingListActive = false;
    this.menuItemSelectionEmitter.emit({
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
    });
  }

  onClickMyCart(): void {
    this.adminActive = false;
    this.catalogActive = false;
    this.orderActive = false;
    this.cartActive = true;
    this.waitingListActive = false;
    this.menuItemSelectionEmitter.emit({
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
    });
  }

  isAdmin(): boolean {
    if (this.currentUser?.roles.includes(this.roleAdmin)) {
      return true;
    }
    return false;
  }
}
