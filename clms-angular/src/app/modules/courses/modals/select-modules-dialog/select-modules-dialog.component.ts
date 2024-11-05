import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CourseModuleProjection } from "@core/modules/openapi";
import {TableModule} from "primeng/table";
import {ButtonDirective} from "primeng/button"; // Adjust the import to your module structure

export interface SelectModulesDialogData {
  modules: CourseModuleProjection[];
}

@Component({
  selector: 'app-select-modules-dialog',
  templateUrl: './select-modules-dialog.component.html',
  imports: [
    TableModule,
    ButtonDirective
  ],
  standalone: true
})
export class SelectModulesDialogComponent {
  modules: CourseModuleProjection[] = []; // Input list of modules
  selectedModules: CourseModuleProjection[] = []; // Array to hold selected modules

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<SelectModulesDialogData>) {
    // Load the modules from config if provided
    if (config.data && config.data.modules) {
      this.modules = config.data.modules;
    }
  }

  // Emit the selected modules and close the dialog
  confirmSelection() {
    this.ref.close(this.selectedModules);
  }

  // Close the dialog without returning any selection
  cancel() {
    this.ref.close();
  }
}
