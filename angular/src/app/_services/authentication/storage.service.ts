import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly authUser = 'auth-user';

  constructor() {}

  saveUser(user: { token: string }): void {
    window.sessionStorage.removeItem(this.authUser);
    window.sessionStorage.setItem(this.authUser, JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(this.authUser);
    if (user) {
      return true;
    }

    return false;
  }

  getUserToken(): any {
    const user = window.sessionStorage.getItem(this.authUser);
    if (user) {
      return JSON.parse(user);
    }
  }

  clean() {
    window.sessionStorage.clear();
  }
}
