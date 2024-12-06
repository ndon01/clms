import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {CourseModuleProjection, CourseProjection, QuestionBankCategory} from "@core/modules/openapi";
import { TreeNode } from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonDirective } from "primeng/button";
import {Tree, TreeModule} from "primeng/tree";
import {NgIf} from "@angular/common";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {
  CourseSelectionComponent, CourseSelectionOutput
} from "@modules/question-bank/components/course-selection/course-selection.component";
import {
  MyCourseSelectionComponent
} from "@modules/question-bank/components/my-course-selection/my-course-selection.component";

export interface SelectCoursesDialogData{
  courses: CourseProjection[];
  multiple: boolean;
  canSelectCourse: boolean;
}
@Component({
  selector: 'app-create-assignment-dialog',
  templateUrl: './create-assignment.component.html',
  imports: [
    TableModule,
    ButtonDirective,
    TreeModule,
    NgIf,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    CourseSelectionComponent,
    MyCourseSelectionComponent
  ],
  standalone: true
})
export class CreateAssignmentComponent {
  multiple = false; // Whether multiple categories can be selected

  newAssignment: AssignmentProjection = {
    name: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date()
  };
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<SelectCoursesDialogData>) {
    // Load the categories and settings from config if provided
    if (config.data) {
      this.multiple = config.data.multiple || false;
    }
  }



  // Confirm and emit selected categories, then close the dialog
  confirmSelection() {
    if (!this.newAssignment) {
      this.ref.close();
    }
    this.ref.close({newAssignment:this.newAssignment});
  }

  // Close the dialog without any selection
  cancel() {
    this.ref.close();
  }

  protected readonly Array = Array;
}
