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
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { ApiService } from '../_services/api/api.service';

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

  emailExists = false;

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

  async onSubmit(): Promise<void> {
    await this.apiService
      .checkIfEmailExists(1, this.registerForm.get('email')!.value as string)
      .then((data: any) => {
        if (data['hydra:totalItems'] > 0) {
          this.emailExists = true;
        } else {
          this.emailExists = false;
        }
      })
      .catch();

    if (
      this.registerForm.get('password')?.value !==
      this.registerForm.get('confirmedPassword')?.value
    ) {
      this.isNotSamePassword = true;
      return;
    } else if (this.emailExists) {
      this.openDialog(false, true);
    } else {
      this.apiService
        .addUser({
          email: this.registerForm.get('email')!.value!.trim(),
          plainPassword: this.registerForm.get('password')!.value!.trim(),
          name: this.registerForm.get('name')!.value!.trim(),
          surname: this.registerForm.get('surname')!.value!.trim(),
          address: this.registerForm.get('address')!.value!.trim(),
          city: this.registerForm.get('city')!.value!.trim(),
          country: this.registerForm.get('country')!.value!.trim(),
          phone: this.registerForm.get('phone')!.value!.trim(),
          postCode: this.registerForm.get('postCode')!.value!.trim(),
        })
        .then(() => {
          this.openDialog(false, false);
        })
        .catch(() => {
          this.openDialog(true, false);
        });
    }
  }

  getNameCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('name');
  }
  getSurnameCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('surname');
  }
  getAddressCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('address');
  }
  getPostCodeCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('postCode');
  }
  getCityCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('city');
  }
  getCountryCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('country');
  }
  getPhoneCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('phone');
  }
  getEmailCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('email');
  }
  getPasswordCtrl(): AbstractControl<string | null, string | null> | null {
    return this.registerForm.get('password');
  }
  getConfirmedPasswordCtrl(): AbstractControl<
    string | null,
    string | null
  > | null {
    return this.registerForm.get('confirmedPassword');
  }

  openDialog(error: boolean, emailExists: boolean): void {
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
        name: this.registerForm.get('name')!.value!.trim(),
        error: error,
        emailExists: emailExists,
      };
      if (!error && !emailExists) {
        this.router.navigate(['/login']);
      }

      this.dialog.open(RegisterDialogComponent, dialogConfig);
    }
  }
}
