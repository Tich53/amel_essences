import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { ApiService } from '../_services/_api/api.service';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm = new FormGroup({
    name: new FormControl<string>('Amélie', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    surname: new FormControl<string>('Legeay', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    address: new FormControl<string>('rue de Chatillon', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    postCode: new FormControl<string>('53300', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    city: new FormControl<string>('Oisseau ', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    country: new FormControl<string>('FRANCE', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    phone: new FormControl<string>('0243004653', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(180),
    ]),
    password: new FormControl<string>('000000', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmedPassword: new FormControl<string>('000000', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  nameError = false;
  surnameError = false;
  addressError = false;
  postCodeError = false;
  cityError = false;
  countryError = false;
  phoneError = false;
  emailError = false;
  passwordError = false;
  confirmedPasswordError = false;
  isNotSamePassword = false;

  nameSubscription?: Subscription;
  surnameSubscription?: Subscription;
  addressSubscription?: Subscription;
  postCodeSubscription?: Subscription;
  citySubscription?: Subscription;
  countrySubscription?: Subscription;
  phoneSubscription?: Subscription;
  emailSubscription?: Subscription;
  passwordSubscription?: Subscription;
  confirmedPasswordSubscription?: Subscription;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm.get('country')?.disable();

    this.nameSubscription = this.getNameCtrl()?.valueChanges.subscribe(() => {
      if (this.getNameCtrl()?.invalid) {
        this.nameError = true;
      } else {
        this.nameError = false;
      }
    });
    this.surnameSubscription = this.getSurnameCtrl()?.valueChanges.subscribe(
      () => {
        if (this.getSurnameCtrl()?.invalid) {
          this.surnameError = true;
        } else {
          this.surnameError = false;
        }
      }
    );
    this.addressSubscription = this.getAddressCtrl()?.valueChanges.subscribe(
      () => {
        if (this.getAddressCtrl()?.invalid) {
          this.addressError = true;
        } else {
          this.addressError = false;
        }
      }
    );
    this.postCodeSubscription = this.getPostCodeCtrl()?.valueChanges.subscribe(
      () => {
        if (this.getPostCodeCtrl()?.invalid) {
          this.postCodeError = true;
        } else {
          this.postCodeError = false;
        }
      }
    );
    this.citySubscription = this.getCityCtrl()?.valueChanges.subscribe(() => {
      if (this.getCityCtrl()?.invalid) {
        this.cityError = true;
      } else {
        this.cityError = false;
      }
    });
    this.countrySubscription = this.getCountryCtrl()?.valueChanges.subscribe(
      () => {
        if (this.getCountryCtrl()?.invalid) {
          this.countryError = true;
        } else {
          this.countryError = false;
        }
      }
    );
    this.phoneSubscription = this.getPhoneCtrl()?.valueChanges.subscribe(() => {
      if (this.getPhoneCtrl()?.invalid) {
        this.phoneError = true;
      } else {
        this.phoneError = false;
      }
    });
    this.emailSubscription = this.getEmailCtrl()?.valueChanges.subscribe(() => {
      if (this.getNameCtrl()?.invalid) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
    });
    this.passwordSubscription = this.getPasswordCtrl()?.valueChanges.subscribe(
      () => {
        if (this.getPasswordCtrl()?.invalid) {
          this.passwordError = true;
        } else {
          this.passwordError = false;
        }
        this.isNotSamePassword = false;
      }
    );
    this.confirmedPasswordSubscription =
      this.getConfirmedPasswordCtrl()?.valueChanges.subscribe(() => {
        if (this.getConfirmedPasswordCtrl()?.invalid) {
          this.confirmedPasswordError = true;
        } else {
          this.confirmedPasswordError = false;
        }
        this.isNotSamePassword = false;
      });
  }

  ngOnDestroy(): void {
    this.nameSubscription?.unsubscribe();
    this.surnameSubscription?.unsubscribe();
    this.addressSubscription?.unsubscribe();
    this.postCodeSubscription?.unsubscribe();
    this.citySubscription?.unsubscribe();
    this.countrySubscription?.unsubscribe();
    this.phoneSubscription?.unsubscribe();
    this.emailSubscription?.unsubscribe();
    this.passwordSubscription?.unsubscribe();
    this.confirmedPasswordSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (
      this.registerForm.get('password')?.value !==
      this.registerForm.get('confirmedPassword')?.value
    ) {
      this.isNotSamePassword = true;
      // } else if() {

      // }
    } else {
      lastValueFrom(
        this.apiService.addUser({
          email: this.registerForm.get('email')?.value as string,
          plainPassword: this.registerForm.get('password')?.value as string,
          name: this.registerForm.get('name')?.value as string,
          surname: this.registerForm.get('surname')?.value as string,
          address: this.registerForm.get('address')?.value as string,
          city: this.registerForm.get('city')?.value as string,
          country: this.registerForm.get('country')?.value as string,
          phone: this.registerForm.get('phone')?.value as string,
          postCode: this.registerForm.get('postCode')?.value as string,
        })
      )
        .then(() => {
          this.openDialog(false);
        })
        .catch(() => {
          this.openDialog(true);
        });
    }
  }

  getNameCtrl() {
    return this.registerForm.get('name');
  }
  getSurnameCtrl() {
    return this.registerForm.get('surname');
  }
  getAddressCtrl() {
    return this.registerForm.get('address');
  }
  getPostCodeCtrl() {
    return this.registerForm.get('postCode');
  }
  getCityCtrl() {
    return this.registerForm.get('city');
  }
  getCountryCtrl() {
    return this.registerForm.get('country');
  }
  getPhoneCtrl() {
    return this.registerForm.get('phone');
  }
  getEmailCtrl() {
    return this.registerForm.get('email');
  }
  getPasswordCtrl() {
    return this.registerForm.get('password');
  }
  getConfirmedPasswordCtrl() {
    return this.registerForm.get('confirmedPassword');
  }

  openDialog(error: boolean): void {
    if (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmedPassword')?.value
    ) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;
      dialogConfig.height = 'fit-content';
      dialogConfig.width = '90%';
      dialogConfig.enterAnimationDuration;
      dialogConfig.exitAnimationDuration;
      dialogConfig.data = {
        name: this.registerForm.get('name')?.value,
        error: error,
      };
      this.dialog.open(RegisterDialogComponent, dialogConfig);
      if (!error) {
        this.router.navigate(['/login']);
      }
    }
  }
}
