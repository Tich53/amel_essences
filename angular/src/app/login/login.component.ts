import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusEnum } from '../_enums/status';
import { User } from '../_interfaces/user';
import { ApiService } from '../_services/api/api.service';

import { AuthService } from '../_services/authentication/auth.service';
import { StorageService } from '../_services/authentication/storage.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  loginError = false;
  emailSubscription?: Subscription;
  passwordSubscription?: Subscription;

  currentUser?: User;

  currentUserStatus?: string;

  status = StatusEnum;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.apiService.getCurrentUser().then();
    if (this.currentUser) {
      this.currentUserStatus = this.currentUser.status.name;
    }
    if (
      this.storageService.isLoggedIn() &&
      this.currentUserStatus === this.status.validated
    ) {
      this.router.navigate(['/home']);
    }

    // Remove the loginError error message when the user change the value of one field
    this.emailSubscription = this.getEmailCtrl()?.valueChanges.subscribe(() => {
      this.loginError = false;
    });
    this.passwordSubscription = this.getPasswordCtrl()?.valueChanges.subscribe(
      () => {
        this.loginError = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.emailSubscription?.unsubscribe();
    this.passwordSubscription?.unsubscribe();
  }

  /**
   * Requête envoyant les identifiants de connexion à l'API et retournant un token si corrects et le stockera
   * dans le "Stockage de session" du navigateur.
   * Dans ce cas, redirection vers la page d'accueil
   */
  async onSubmit(): Promise<void> {
    this.storageService.clean();
    await this.authService
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .then((data: any) => {
        this.storageService.saveUser(data);
      })
      .catch(() => {
        this.loginError = true;
      });

    this.currentUser = await this.apiService.getCurrentUser();
    this.currentUserStatus = this.currentUser?.status.name;

    if (this.currentUserStatus === this.status.validated) {
      this.router.navigate(['/home']);
    }
    if (
      this.currentUserStatus !== this.status.validated &&
      this.loginError === false
    ) {
      this.storageService.clean();
      this.openDialog();
    }
  }

  getEmailCtrl(): AbstractControl<string | null, string | null> | null {
    return this.loginForm.get('email');
  }

  getPasswordCtrl(): AbstractControl<string | null, string | null> | null {
    return this.loginForm.get('password');
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
    dialogConfig.data = {
      currentUserStatus: this.currentUserStatus,
    };
    this.dialog.open(LoginDialogComponent, dialogConfig);
  }
}
