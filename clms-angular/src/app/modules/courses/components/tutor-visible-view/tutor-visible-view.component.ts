import {Component, OnInit} from '@angular/core';
import {CurrentCourseContextService} from "@modules/courses/services/current-course-context.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tutor-visible-view',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tutor-visible-view.component.html',
  styleUrl: './tutor-visible-view.component.css'
})
export class TutorVisibleViewComponent implements OnInit{
  constructor(private currentCourseContextService: CurrentCourseContextService){
  }
  isTutor:boolean | undefined = false;
  ngOnInit() {
    this.isTutor = this.currentCourseContextService.isCourseTutor();
  }

}
