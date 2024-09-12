import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [PasswordInputFieldComponent],
  exports: [PasswordInputFieldComponent],
  providers: [],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
