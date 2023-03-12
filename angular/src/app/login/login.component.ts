import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  loginSubscription?: Subscription;
  loginError = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      // window.location.href = '/home';
    }
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
}
