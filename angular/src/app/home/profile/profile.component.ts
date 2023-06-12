import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterDialogComponent } from 'src/app/register/register-dialog/register-dialog.component';
import { User } from 'src/app/_interfaces/user';
import { ApiService } from 'src/app/_services/api/api.service';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() currentUser?: User;

  profileForm = new FormGroup({
    name: new FormControl<string>(this.currentUser?.name as string, [
      Validators.required,
      Validators.maxLength(60),
    ]),
    surname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    address: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    postCode: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    city: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });

  nameError = false;
  surnameError = false;
  addressError = false;
  postCodeError = false;
  cityError = false;
  phoneError = false;

  nameSubscription?: Subscription;
  surnameSubscription?: Subscription;
  addressSubscription?: Subscription;
  postCodeSubscription?: Subscription;
  citySubscription?: Subscription;
  phoneSubscription?: Subscription;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.currentUser) {
      this.profileForm.setValue({
        name: this.currentUser.name,
        surname: this.currentUser.surname,
        address: this.currentUser.address,
        postCode: this.currentUser.postCode,
        city: this.currentUser.city,
        phone: this.currentUser.phone,
      });
    }

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
    this.phoneSubscription = this.getPhoneCtrl()?.valueChanges.subscribe(() => {
      if (this.getPhoneCtrl()?.invalid) {
        this.phoneError = true;
      } else {
        this.phoneError = false;
      }
    });

    console.log(this.currentUser);
  }

  ngOnDestroy(): void {
    this.nameSubscription?.unsubscribe();
    this.surnameSubscription?.unsubscribe();
    this.addressSubscription?.unsubscribe();
    this.postCodeSubscription?.unsubscribe();
    this.citySubscription?.unsubscribe();
    this.phoneSubscription?.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    const patchProfile = {
      name: this.profileForm.get('name')!.value!.trim(),
      surname: this.profileForm.get('surname')!.value!.trim(),
      address: this.profileForm.get('address')!.value!.trim(),
      city: this.profileForm.get('city')!.value!.trim(),
      phone: this.profileForm.get('phone')!.value!.trim(),
      postCode: this.profileForm.get('postCode')!.value!.trim(),
    };
    this.apiService
      .updateProfile(this.currentUser as User, patchProfile)
      .then(() => this.openDialog())
      .catch();
  }

  getNameCtrl(): AbstractControl<string | null, string | null> | null {
    return this.profileForm.get('name');
  }
  getSurnameCtrl(): AbstractControl<string | null, string | null> | null {
    return this.profileForm.get('surname');
  }
  getAddressCtrl(): AbstractControl<string | null, string | null> | null {
    return this.profileForm.get('address');
  }
  getPostCodeCtrl(): AbstractControl<string | null, string | null> | null {
    return this.profileForm.get('postCode');
  }
  getCityCtrl(): AbstractControl<string | null, string | null> | null {
    return this.profileForm.get('city');
  }
  getPhoneCtrl(): AbstractControl<string | null, string | null> | null {
    return this.profileForm.get('phone');
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
      name: this.profileForm.get('name')!.value!.trim(),
    };
    this.dialog.open(ProfileDialogComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => window.location.reload());
  }
}
