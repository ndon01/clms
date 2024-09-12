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
import {catchError, map, tap} from 'rxjs';
import { AbstractControl } from '@angular/forms';
import {LoginService} from "@modules/authentication/pages/login/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    InputQuestionComponentComponent,
    RouterLink,
    NgClass,
    PasswordInputFieldComponent,
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = new FormControl<String>("");

  password = new FormControl<String>("");

  constructor(private router: Router, public location: Location, private loginService: LoginService, private loadingAmbianceService: LoadingAmbianceService) {
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
  }

  onSubmit() {
    // Implement authentication logic here
    // TODO: validate form before HTTP request

    this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.LOADING
    this.loginService.login(this.username.value || "", this.password.value || "")
      .pipe(tap(response => this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE))
      .subscribe((response) => {
      this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE
        this.router.navigate(["/dashboard"])
    })

  }
}
