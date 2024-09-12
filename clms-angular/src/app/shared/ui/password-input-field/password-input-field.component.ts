import { Component, forwardRef, Input } from '@angular/core';
import { Form, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'password-input-field',
  templateUrl: './password-input-field.component.html',
  styleUrl: './password-input-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PasswordInputFieldComponent)
    }
  ]
})
export class PasswordInputFieldComponent {
  @Input() control: FormControl = new FormControl("");
  @Input() identifier: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() title: string | undefined;

  isConfidential: boolean = true;

  togglePassword() {
    console.log("click")
    this.isConfidential = !this.isConfidential
  }

}
