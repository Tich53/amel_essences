import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/_interfaces/user';
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
  @Input() currentUser?: User;
  @Output() menuItemSelectionEmitter = new EventEmitter<{
    profileActive: boolean;
    adminActive: boolean;
    catalogActive: boolean;
    orderActive: boolean;
    cartActive: boolean;
    waitingListActive: boolean;
    recapActive: boolean;
  }>();

  readonly roleAdmin = 'ROLE_ADMIN';
  readonly easyAdminUrl = 'https://localhost:8000/admin';

  showMenu = false;

  profileActive = false;
  adminActive = false;
  catalogActive = true;
  orderActive = false;
  cartActive = false;
  waitingListActive = false;
  recapActive = false;

  constructor(
    private storageService: StorageService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.menuItemSelectionEmitter.emit({
      profileActive: this.profileActive,
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
      recapActive: this.recapActive,
    });
  }

  isAdmin(): boolean {
    if (this.currentUser?.roles.includes(this.roleAdmin)) {
      return true;
    }
    return false;
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['/login']);
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

  onClickProfile(): void {
    this.activeLink(true, false, false, false, false, false, false);
  }

  onClickAdmin(): void {
    this.activeLink(false, true, false, false, false, false, false);
  }

  onClickCatalog(): void {
    this.activeLink(false, false, true, false, false, false, false);
  }

  onClickWaitingList(): void {
    this.activeLink(false, false, false, false, false, true, false);
  }

  onClickMyOrders(): void {
    this.activeLink(false, false, false, true, false, false, false);
  }

  onClickMyCart(): void {
    this.activeLink(false, false, false, false, true, false, false);
  }

  onClickRecap(): void {
    this.activeLink(false, false, false, false, false, false, true);
  }

  activeLink(
    profile: boolean,
    admin: boolean,
    catalog: boolean,
    order: boolean,
    cart: boolean,
    waitingList: boolean,
    recap: boolean
  ): void {
    this.profileActive = profile;
    this.adminActive = admin;
    this.catalogActive = catalog;
    this.orderActive = order;
    this.cartActive = cart;
    this.waitingListActive = waitingList;
    this.recapActive = recap;
    this.menuItemSelectionEmitter.emit({
      profileActive: this.profileActive,
      adminActive: this.adminActive,
      catalogActive: this.catalogActive,
      orderActive: this.orderActive,
      cartActive: this.cartActive,
      waitingListActive: this.waitingListActive,
      recapActive: this.recapActive,
    });
    this.showMenu = false;
  }
}
