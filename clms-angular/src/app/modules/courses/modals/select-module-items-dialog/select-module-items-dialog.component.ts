import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {CourseModuleItemProjection, CourseModuleProjection} from "@core/modules/openapi";
import {TableModule} from "primeng/table";
import {ButtonDirective} from "primeng/button"; // Adjust the import to your module structure

export interface SelectModulesItemsDialogData {
  items: CourseModuleItemProjection[];
}

@Component({
  selector: 'app-select-module-items-dialog',
  templateUrl: './select-module-items-dialog.component.html',
  imports: [
    TableModule,
    ButtonDirective
  ],
  standalone: true
})
export class SelectModuleItemsDialogComponent {
  items: CourseModuleItemProjection[] = []; // Input list of modules
  selectedItems: CourseModuleItemProjection[] = []; // Array to hold selected modules

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<SelectModulesItemsDialogData>) {
    // Load the modules from config if provided
    if (config.data && config.data.items) {
      this.items = config.data.items;
    }
  }

  // Emit the selected modules and close the dialog
  confirmSelection() {
    this.ref.close(this.selectedItems);
  }

  // Close the dialog without returning any selection
  cancel() {
    this.ref.close();
  }
}
