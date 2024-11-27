import { Component } from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {Button, ButtonDirective} from "primeng/button";
import {CoursesModule} from "@modules/courses/courses.module";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TutorVisibleViewComponent} from "@modules/courses/components/tutor-visible-view/tutor-visible-view.component";

@Component({
  selector: 'app-course-performance-page',
  templateUrl: './course-performance-page.component.html',
  styleUrl: './course-performance-page.component.css'
})
export class CoursePerformancePageComponent {

}
