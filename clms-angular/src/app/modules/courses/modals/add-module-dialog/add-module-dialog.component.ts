import { Component, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";

@Component({
  selector: 'app-add-module-dialog',
  templateUrl: './add-module-dialog.component.html',
  imports: [
    DialogModule,
    FormsModule,
    Button
  ],
  standalone: true
})
export class AddModuleDialogComponent {
  newModuleTitle: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  addModule() {
    if (this.newModuleTitle) {
      this.ref.close(this.newModuleTitle); // Pass the module title back to the parent component
    }
  }

  cancel() {
    this.ref.close(); // Close the dialog without saving
  }
}
