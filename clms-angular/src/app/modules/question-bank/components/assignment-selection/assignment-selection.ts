import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {NgIf} from "@angular/common";
import {
  Assignment,
  AssignmentDetailsProjection,
  AssignmentProjection,
  CourseDetailsProjection,
  CourseProjection
} from "@core/modules/openapi";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {
  MyCourseSelectionOutput
} from "@modules/question-bank/components/my-course-selection/my-course-selection.component";

export type AssignmentSelectionOutput = AssignmentDetailsProjection[] | AssignmentDetailsProjection | null;
@Component({
  selector: 'app-assignment-selection',
  standalone: true,
  imports: [
    DropdownModule,
    MultiSelectModule,
    NgIf,
    FormsModule
  ],
  templateUrl: 'assignment-selection.html',
  styleUrl: 'assignment-selection.css'
})
export class AssignmentSelection implements OnInit,OnChanges{
  @Input () course: CourseProjection | null= null;
  assignments:AssignmentDetailsProjection[] = []; // Input list of categories
  @Input() multiple = false; // Whether multiple categories can be selected
  @Input() selectedAssignments : AssignmentSelectionOutput = null; // Selected categories
  @Output() selectedAssignmentsChange= new EventEmitter<AssignmentSelectionOutput>();

  onAssignmentSelectionChange(event: AssignmentSelectionOutput){
    this.selectedAssignmentsChange.emit(event);
    this.fetchAssignments();
  }
  constructor(private httpClient: HttpClient, private dialogService: DialogService) {
  }
  ngOnInit() {
    this.fetchAssignments();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes["course"]!= null) {
      this.fetchAssignments();
  }}

  fetchAssignments(){
    if (this.course == null || this.course.id == null ) {
      return;
    }
    this.httpClient.get<AssignmentDetailsProjection[]>(`/api/courses/getAllAssignmentsDetails`,
    {
      params: {
        courseId: this.course.id.toString()
      }
    }
    ).subscribe(
      (response) => {
        this.assignments = response;
      });
  }
}
