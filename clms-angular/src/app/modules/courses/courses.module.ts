import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoursesDashboardPageComponent
} from "@modules/courses/pages/courses-dashboard-page/courses-dashboard-page.component";
import {CoursesRoutingModule} from "@modules/courses/courses-routing.module";
import {CoreModule} from "@core/core.module";



@NgModule({
  declarations: [CoursesDashboardPageComponent],
  exports: [CoursesDashboardPageComponent],
  imports: [
    CommonModule, CoursesRoutingModule, CoreModule
  ]
})
export class CoursesModule { }
