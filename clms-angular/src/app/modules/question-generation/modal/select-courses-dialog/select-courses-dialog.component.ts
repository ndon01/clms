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

export interface SelectCoursesDialogData{
  courses: CourseProjection[];
  multiple: boolean;
}

@Component({
  selector: 'app-select-courses-dialog',
  templateUrl: './select-courses-dialog.component.html',
  imports: [
    TableModule,
    ButtonDirective,
    TreeModule,
    NgIf,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    CalendarModule
  ],
  standalone: true
})
export class SelectCoursesDialogComponent  {
  courses: CourseProjection[] = []; // Input list of categories
  multiple = false; // Whether multiple categories can be selected
  selectedCourses: CourseProjection[] | CourseProjection= []; // Selected categories

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
      this.courses = config.data.courses|| [];
    }
  }



  // Confirm and emit selected categories, then close the dialog
  confirmSelection() {
    if (!this.selectedCourses || !this.newAssignment) {
      this.ref.close();
    }
    console.log("Assignment before closing",this.newAssignment)
    this.ref.close({selectedCourses: this.selectedCourses,newAssignment:this.newAssignment});
  }

  // Close the dialog without any selection
  cancel() {
    this.ref.close();
  }

  protected readonly Array = Array;
}
