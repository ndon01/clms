import {Component, OnInit} from '@angular/core';
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
import {catchError, map, Observable, tap} from 'rxjs';
import { AbstractControl } from '@angular/forms';
import {LoginService} from "@modules/authentication/pages/login/login.service";
import {MessageService} from "primeng/api";
import {ClientService} from "@core/services/client/client.service";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'authentication-login-page',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isGoogleLoginEnabled = false;

  username = new FormControl<String>("");

  password = new FormControl<String>("");

  isInvalidCredentials = false;

  constructor(private router: Router, public location: Location, private loginService: LoginService, private loadingAmbianceService: LoadingAmbianceService, private messageService: MessageService, private clientDataSourceService: ClientDataSourceService, private httpClient: HttpClient) {
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
        this.clientDataSourceService.refresh();
        this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE
        this.router.navigate(["/dashboard"])
        this.messageService.add({severity:'success', summary:'Success', detail:'Welcome back!'});
    }, () => {
        this.isInvalidCredentials = true
        this.loadingAmbianceService.loadingAmbianceState = LoadingAmbianceState.NONE
      })

  }

  onLoginWithGoogle() {
    this.getGoogleAuthUrl().subscribe({
      next: (url: string) => {
        window.location.href = url; // Redirect the user to the Google login page
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to initiate Google login' });
        console.error(err);
      }
    });
  }

  getGoogleAuthUrl(): Observable<string> {
    return this.httpClient.get(`/api/v1/authentication/oauth/google/url`, { responseType: 'text' });
  }

  ngOnInit() {
    // Check if Google login is enabled
    this.httpClient.get(`/api/v1/authentication/oauth/google/enabled`, { responseType: 'text' })
      .subscribe({
        next: (enabled: string) => {
          this.isGoogleLoginEnabled = enabled === 'true';
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to check if Google login is enabled'
          });
          console.error(err);
        }
      });
  }
}


