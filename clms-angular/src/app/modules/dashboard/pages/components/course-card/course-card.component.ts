import {Component, Input} from '@angular/core';
import {UserProjection} from "@core/model/User.model";
import {CourseProjection} from "@modules/courses/model/course.model";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course: CourseProjection | null = {id: 0, name: '', description: ''};

  constructor(private router: Router) {

  }
  viewCourse() {
    this.router.navigate(['courses', this.course?.id]);
  }
}
