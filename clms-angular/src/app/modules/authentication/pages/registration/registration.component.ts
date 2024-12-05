import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../core/components/navbar/navbar.component';
import {
  InputQuestionComponentComponent
} from '../../../../shared/ui/input-question-component/input-question-component/input-question-component.component';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { RegistrationService } from '@modules/authentication/pages/registration/registration.service';
import { LoadingAmbianceService, LoadingAmbianceState } from '@core/services/loading-ambiance/loading-ambiance.service';
import { PasswordInputFieldComponent } from '@shared/ui/password-input-field/password-input-field.component';
import { catchError, map, tap } from 'rxjs';

enum ValidationStateEnum {
  VALID,
  PROCESSING,
  INVALID
}

import { AbstractControl } from '@angular/forms';
import {MessageService} from "primeng/api";

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  if (!password) return null;

  const errors: ValidationErrors = {};

  if (password.length < 10 || password.length > 64) {
    errors['length'] = 'Password must be between 10 and 64 characters long';
  }

  if (!/[A-Z]/.test(password)) {
    errors['uppercase'] = 'Password must contain at least one uppercase letter';
  }

  if (!/[a-z]/.test(password)) {
    errors['lowercase'] = 'Password must contain at least one lowercase letter';
  }

  if (!/\d/.test(password)) {
    errors['digit'] = 'Password must contain at least one digit';
  }

  if (!/[!@#$%^&*()\-_=+]/.test(password)) {
    errors['specialChar'] = 'Password must contain at least one special character (!@#$%^&*()-_+=)';
  }

  if (/\s/.test(password)) {
    errors['noSpaces'] = 'Password cannot contain spaces';
  }

  return Object.keys(errors).length ? errors : null;
}


@Component({
  selector: 'authentication-registration-page',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  username = new FormControl<String>("");
  password = new FormControl<String>("", [passwordValidator]);
  confirmPassword = new FormControl<String>("");
  isInvalidCredentials = false

  constructor(private router: Router, public location: Location, private registrationService: RegistrationService, private loadingAmbianceService: LoadingAmbianceService, private messageService: MessageService) {
    const passwordCharacterLimiter = map((newString: String | null) => {
      if (newString == null) return null;
      return newString.substring(0, 64);
    })

    const onlySelectCharacters = map((newString: String | null) => {
      if (newString == null) return null;

      // Define a regex pattern to match only allowed characters (including special characters)
      const allowedPattern = /[A-Za-z0-9\d!@#$%^&*]/;

      // Filter out illegal characters and join the string back
      const filteredString = newString.split('').filter(char => allowedPattern.test(char)).join('');

      return filteredString;
    });



    this.password.valueChanges
      .pipe(passwordCharacterLimiter)
      .pipe(onlySelectCharacters)
      .subscribe((newValue) => {
        if (newValue == null) return;
        this.password.setValue(newValue, {emitEvent: false})
    })

    this.confirmPassword.valueChanges
      .pipe(passwordCharacterLimiter)
      .pipe(onlySelectCharacters)
      .subscribe((newValue) => {
        if (newValue == null) return;
        this.confirmPassword.setValue(newValue, {emitEvent: false})
      })
  }

  onSubmit() {
    if (this.password.value !== this.confirmPassword.value) alert("Passwords must match");

    // TODO: validate form before HTTP request

    this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.LOADING
    this.registrationService.register(this.username.value || "", this.password.value || "")
      .pipe(tap(response => this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE))
      .subscribe((response) => {
        this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE
        if (response.status == 201) {
          this.messageService.add({severity: 'success', summary: 'Registration Successful', detail: 'You have successfully registered. Please login to continue.'});
          this.router.navigate(["/login"])
        }
      }, () => {
        this.isInvalidCredentials = true
        this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE
      });
  }
}
