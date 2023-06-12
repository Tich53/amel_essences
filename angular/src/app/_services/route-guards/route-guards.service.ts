import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StatusEnum } from 'src/app/_enums/status';
import { ApiService } from '../api/api.service';
import { StorageService } from '../authentication/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardsService {
  status = StatusEnum;

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const currentUser = await this.apiService.getCurrentUser();

    if (
      !this.storageService.isLoggedIn() ||
      !(currentUser?.status.name === this.status.validated)
    ) {
      this.router.navigate(['/login']);
    }
    return (
      this.storageService.isLoggedIn() &&
      currentUser?.status.name === this.status.validated
    );
  }
}
