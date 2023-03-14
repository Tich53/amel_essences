import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../_services/_authentication/auth.service';
import { StorageService } from '../_services/_authentication/storage.service';

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

  loginFormSubmitted = false;
  loginSubscription?: Subscription;
  loginFailed = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      // window.location.href = '/home';
    }

    // Remove the loginFailed error message when the user change the value of one field
    this.getEmailCtrl()?.valueChanges.subscribe(() => {
      this.loginFailed = false;
    });
    this.getPasswordCtrl()?.valueChanges.subscribe(() => {
      this.loginFailed = false;
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  /**
   * Requête envoyant les identifiants de connexion à l'API et retournant un token si corrects et le stockera
   * dans le "Stockage de session" denotre navigateur.
   * Dans ce cas, redirection vers la page d'accueil
   */
  onSubmit() {
    this.loginFormSubmitted = true;
    this.loginSubscription = this.authService
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
          // window.location.href = '/home';
        },
        error: () => {
          this.loginFailed = true;
        },
      });
  }

  getEmailCtrl() {
    return this.loginForm.get('email');
  }

  getPasswordCtrl() {
    return this.loginForm.get('password');
  }
}
