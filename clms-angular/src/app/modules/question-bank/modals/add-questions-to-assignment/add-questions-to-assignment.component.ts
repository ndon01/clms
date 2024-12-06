import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {DynamicDialogRef, DynamicDialogConfig, DialogService} from 'primeng/dynamicdialog';
import {
  AssignmentProjection,
  CourseModuleProjection,
  CourseProjection,
  QuestionBankCategory
} from "@core/modules/openapi";
import { TreeNode } from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonDirective } from "primeng/button";
import {Tree, TreeModule} from "primeng/tree";
import {NgIf} from "@angular/common";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {
  CourseSelectionComponent
} from "@modules/question-bank/components/course-selection/course-selection.component";
import {
  MyCourseSelectionComponent, MyCourseSelectionOutput
} from "@modules/question-bank/components/my-course-selection/my-course-selection.component";
import {
  AssignmentSelection,
  AssignmentSelectionOutput
} from "@modules/question-bank/components/assignment-selection/assignment-selection";
import {ChipsModule} from "primeng/chips";
import {InputTextareaModule} from "primeng/inputtextarea";
import {HttpClient} from "@angular/common/http";
import {CreateAssignmentComponent} from "@modules/question-bank/modals/create-assignment/create-assignment.component";

export interface SelectCoursesDialogData{
  courses: CourseProjection[];
  multiple: boolean;
}
@Component({
  selector: 'app-add-questions-to-assignment',
  templateUrl: './add-questions-to-assignment.component.html',
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
    MyCourseSelectionComponent,
    AssignmentSelection,
    ChipsModule,
    InputTextareaModule
  ],
  standalone: true
})
export class AddQuestionsToAssignmentComponent {
  courses: CourseProjection[] = []; // Input list of categories
  multiple = false; // Whether multiple categories can be selected
  selectedCourse: MyCourseSelectionOutput= null; // Selected categories
  selectedAssignments: AssignmentSelectionOutput = null;
  assignmentCourse: CourseProjection | null = null;
  newAssignment: AssignmentProjection = {
    name: '',
    description: '',
    startDate: new Date().toDateString(),
    dueDate: new Date().toDateString()
  };
  possibleAssignments: AssignmentProjection[] = [];
  constructor(public ref: DynamicDialogRef,
              public http: HttpClient,
              public config: DynamicDialogConfig<SelectCoursesDialogData>,
              public dialogService: DialogService) {
    // Load the categories and settings from config if provided
    if (config.data) {
      this.multiple = config.data.multiple || false;
      this.courses = config.data.courses|| [];
    }
  }
  // Confirm and emit selected categories, then close the dialog
  confirmSelection() {
    if (!this.selectedCourse|| !this.newAssignment) {
      this.ref.close();
    }
    this.ref.close({selectedCourses: this.selectedCourse, selectedAssignment: this.selectedAssignments});
  }

  // Close the dialog without any selection
  cancel() {
    this.ref.close();
  }

  protected readonly Array = Array;

  onCourseSelection($event: MyCourseSelectionOutput) {
    console.log($event);
    if(Array.isArray($event)) {
      this.selectedCourse = $event[0];
    }else{
      this.selectedCourse = $event;
    }
    this.assignmentCourse = this.selectedCourse;
    }

  getContinueButtonText(): string {
    return "Export"
  }
  getContinueButtonDisabled(): boolean {
    return this.selectedAssignments == null;
  }

  createNewAssignment() {
    this.dialogService.open(CreateAssignmentComponent, {
      data: {
      },
      header: 'Create Assignment',
      width: '70%',
    }).onClose.subscribe((result) => {
      if(Array.isArray(this.selectedCourse) || !result || !this.selectedCourse || !this.selectedCourse?.id){
        console.log("No result");
        return
      }
      this.newAssignment = result.newAssignment;

      this.http.post<AssignmentProjection>(`/api/courses/${this.selectedCourse.id}/assignments/create`, this.newAssignment).subscribe(
        newAssignment => {
          let clone = structuredClone(this.possibleAssignments);
          clone.push(newAssignment);
          this.possibleAssignments = clone;
          this.selectedAssignments = newAssignment;
      });
    });
  }
}
