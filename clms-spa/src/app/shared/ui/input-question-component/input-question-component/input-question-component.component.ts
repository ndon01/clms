import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-question-component',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './input-question-component.component.html',
  styleUrl: './input-question-component.component.css'
})
export class InputQuestionComponentComponent {

  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() secured: boolean = false;
  inputFocused: boolean = false;

  @Input() formControl: FormControl = new FormControl<String>('')
  @Input() name: string = ''
  @Input() id: string = ''

  constructor() {}

  onGainFocus() {
    console.log('Input focused');
    this.inputFocused = true;
  }

  onLoseFocus() {
    console.log('Input lost focus');
    this.inputFocused = false;
  }

}
