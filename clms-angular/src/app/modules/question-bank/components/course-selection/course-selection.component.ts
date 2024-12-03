import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {NgIf} from "@angular/common";
import {CourseProjection} from "@core/modules/openapi";
import {FormsModule} from "@angular/forms";

export type CourseSelectionOutput = CourseProjection[] | CourseProjection | null;
@Component({
  selector: 'app-course-selection',
  standalone: true,
  imports: [
    DropdownModule,
    MultiSelectModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './course-selection.component.html',
  styleUrl: './course-selection.component.css'
})
export class CourseSelectionComponent {

  @Input() courses: CourseProjection[] = []; // Input list of categories
  @Input() multiple = false; // Whether multiple categories can be selected
  @Input() selectedCourses: CourseSelectionOutput = []; // Selected categories
  @Output() selectedCoursesChange = new EventEmitter<CourseSelectionOutput>();

  onCourseChange(event: CourseSelectionOutput){
    console.log(event);
    this.selectedCoursesChange.emit(event);
  }
}
