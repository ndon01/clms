import { Component } from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {AssignmentProjection} from "@core/modules/openapi";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

export interface AssignmentSelectionDialogData {
  assignments: AssignmentProjection[];
  selectedAssignments?: AssignmentProjection[];
}

@Component({
  selector: 'app-assignment-selection-dialog',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule,
    ButtonDirective
  ],
  templateUrl: './assignment-selection-dialog.component.html',
  styleUrl: './assignment-selection-dialog.component.css'
})
export class AssignmentSelectionDialogComponent {
  assignments: AssignmentProjection[] = [];
  selectedAssignments: AssignmentProjection[] = [];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<AssignmentSelectionDialogData>) {
    if (config.data) {
      this.assignments = [...config.data.assignments];
      this.selectedAssignments = config.data.selectedAssignments ? [...config.data.selectedAssignments] : [];
    }
  }

  addAssignmentsToModule() {
    this.ref.close(this.selectedAssignments);
  }


  cancel() {
    this.ref.close();
  }
}
