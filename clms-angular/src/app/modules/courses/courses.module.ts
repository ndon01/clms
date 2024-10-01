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



@NgModule({
  declarations: [CoursesDashboardPageComponent, CourseSideBarComponent,IndividualCourseHomepageComponent, CourseSettingsPageComponent],
  exports: [CoursesDashboardPageComponent, CourseSideBarComponent, IndividualCourseHomepageComponent, CourseSettingsPageComponent],
  imports: [
    CommonModule, CoursesRoutingModule, CoreModule, CardModule, ButtonDirective, OverlayPanelModule, TableModule, DialogModule, Ripple
  ]
})
export class CoursesModule { }
