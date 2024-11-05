import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CourseModuleProjection } from "@core/modules/openapi";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";

export interface ReorderModulesDialogData {
  modules: CourseModuleProjection[];
}

@Component({
  selector: 'app-reorder-modules-dialog',
  templateUrl: './reorder-modules-dialog.component.html',
  imports: [
    TableModule,
    Button
  ],
  standalone: true
})
export class ReorderModulesDialogComponent {
  reorderTempModules: CourseModuleProjection[] = [];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<ReorderModulesDialogData>) {
    if (config.data) {
      this.reorderTempModules = structuredClone(config.data.modules); // Clone the modules to avoid modifying the original array
    }
  }

  onModulesReordered(event: any) {
    this.reorderTempModules.forEach((module, index) => {
      module.moduleOrder = index + 1;
    });
  }

  saveModuleOrder() {
    this.ref.close(this.reorderTempModules); // Pass the reordered modules back to the parent
  }

  cancel() {
    this.ref.close(); // Close the dialog without saving
  }
}
