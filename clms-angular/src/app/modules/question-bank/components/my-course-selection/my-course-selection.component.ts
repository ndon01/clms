import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseDetailsProjection, CourseProjection} from "@core/modules/openapi";
import {
  SelectCoursesDialogComponent
} from "@modules/question-generation/modal/select-courses-dialog/select-courses-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {HttpClient} from "@angular/common/http";
import {
  CourseSelectionComponent,
  CourseSelectionOutput
} from "@modules/question-bank/components/course-selection/course-selection.component";

export type MyCourseSelectionOutput = CourseSelectionOutput;
@Component({
  selector: 'app-my-course-selection',
  standalone: true,
  imports: [
    CourseSelectionComponent
  ],
  templateUrl: './my-course-selection.component.html',
  styleUrl: './my-course-selection.component.css'
})
export class MyCourseSelectionComponent  implements OnInit{

  @Input() courses: CourseProjection[] = []; // Input list of categories
  @Input() multiple = false; // Whether multiple categories can be selected
  @Input() selectedCourses: MyCourseSelectionOutput = []; // Selected categories
  @Output() selectedCoursesChange = new EventEmitter<MyCourseSelectionOutput>();

  onCourseChange(event:MyCourseSelectionOutput){
    this.selectedCoursesChange.emit(event);
  }
  constructor(private httpClient: HttpClient, private dialogService: DialogService) {
  }
  ngOnInit() {
    this.httpClient.get<CourseDetailsProjection[]>(`/api/courses/getMyCourses`).subscribe(
      (response) => {
        this.courses = response;
   });
  }
}
