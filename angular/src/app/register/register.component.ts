import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    surname: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
    postCode: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    country: new FormControl<string>('FRANCE', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    this.registerForm.get('country')?.disable();
  }

  onSubmit() {
    console.log("Enregistrer les infos via l'API");
  }
}
