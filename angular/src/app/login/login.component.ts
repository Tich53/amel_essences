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
  loginError = false;
  loginSubscription?: Subscription;
  emailSubscription?: Subscription;
  passwordSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      // window.location.href = '/home';
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
    this.loginSubscription?.unsubscribe();
    this.emailSubscription?.unsubscribe();
    this.passwordSubscription?.unsubscribe();
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
          this.loginError = true;
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
