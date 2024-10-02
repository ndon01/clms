import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoursesDashboardPageComponent
} from "@modules/courses/pages/courses-dashboard-page/courses-dashboard-page.component";
import {CoursesRoutingModule} from "@modules/courses/courses-routing.module";
import {CoreModule} from "@core/core.module";
import {CardModule} from "primeng/card";
import {ButtonDirective} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {CourseSideBarComponent} from "@modules/courses/components/course-side-bar/course-side-bar.component";
import {
  IndividualCourseHomepageComponent
} from "@modules/courses/pages/individual-course-homepage/individual-course-homepage.component";
import {CourseSettingsPageComponent} from "@modules/courses/pages/course-settings-page/course-settings-page.component";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {Ripple} from "primeng/ripple";
import {
  CourseAssignmentsPageComponent
} from "@modules/courses/pages/course-assignments-page/course-assignments-page.component";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [CoursesDashboardPageComponent, CourseSideBarComponent,IndividualCourseHomepageComponent, CourseSettingsPageComponent, CourseAssignmentsPageComponent],
  exports: [CoursesDashboardPageComponent, CourseSideBarComponent, IndividualCourseHomepageComponent, CourseSettingsPageComponent, CourseAssignmentsPageComponent],
  imports: [
    CommonModule, CoursesRoutingModule, CoreModule, CardModule, ButtonDirective, OverlayPanelModule, TableModule, DialogModule, Ripple, CalendarModule, FormsModule
  ]
})
export class CoursesModule { }
