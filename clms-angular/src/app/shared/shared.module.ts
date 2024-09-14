import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateButtonFooter} from "@shared/ui/modals/footers/create-footer/footer.component";


@NgModule({
  declarations: [PasswordInputFieldComponent, CreateButtonFooter],
  exports: [PasswordInputFieldComponent, CreateButtonFooter],
  providers: [],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
