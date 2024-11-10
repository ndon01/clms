import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-editable-text-input-field',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './editable-text-input-field.component.html',
  styleUrl: './editable-text-input-field.component.css'
})
export class EditableTextInputFieldComponent {
  @Input() value: string = ""
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() valueAndEventEmitter: EventEmitter<{ value: string, event: Event }> = new EventEmitter<{ value: string, event: Event }>();
  editing: boolean = false;

  editClickedCallback(event: Event) {
    event.stopPropagation();
    this.editing = true;
  }

  saveClickedCallback($event: MouseEvent) {
    $event.stopPropagation();
    this.editing = false;
    this.valueChange.emit(this.value);}
}
