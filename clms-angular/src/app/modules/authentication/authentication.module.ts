import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import {LoginComponent} from "@modules/authentication/pages/login/login.component";
import {RegistrationComponent} from "@modules/authentication/pages/registration/registration.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [RegistrationComponent, LoginComponent]
})
export class AuthenticationModule { }
