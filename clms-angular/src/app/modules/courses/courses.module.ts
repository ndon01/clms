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



@NgModule({
  declarations: [CoursesDashboardPageComponent, CourseSideBarComponent],
  exports: [CoursesDashboardPageComponent],
  imports: [
    CommonModule, CoursesRoutingModule, CoreModule, CardModule, ButtonDirective, OverlayPanelModule
  ]
})
export class CoursesModule { }
