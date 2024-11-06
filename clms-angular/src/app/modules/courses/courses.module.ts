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
import {PickListModule} from "primeng/picklist";
import {HttpClient} from "@angular/common/http";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {AvatarModule} from "primeng/avatar";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {MultiSelectModule} from "primeng/multiselect";
import {ThemeSwitcherComponent} from "@core/components/theme-switcher/theme-switcher.component";
import {MenuModule} from "primeng/menu";
import {CourseCardComponent} from "@modules/dashboard/pages/components/course-card/course-card.component";
import {SkeletonModule} from "primeng/skeleton";
import {CourseModulesPageComponent} from "@modules/courses/pages/course-modules-page/course-modules-page.component";

import {AdminGradebookComponent} from "@modules/courses/components/admin-gradebook/admin-gradebook.component";
import {
  CourseGradebookAdminPageComponent
} from "@modules/courses/pages/course-gradebook-admin-page/course-gradebook-admin-page.component";
import {TagModule} from "primeng/tag";
import {AccordionModule} from "primeng/accordion";
import {BadgeModule} from "primeng/badge";
import {MenubarModule} from "primeng/menubar";
import {StyleClassModule} from "primeng/styleclass";


@NgModule({
  declarations: [CoursesDashboardPageComponent, CourseSideBarComponent,IndividualCourseHomepageComponent, CourseSettingsPageComponent, CourseAssignmentsPageComponent, CourseModulesPageComponent,AdminGradebookComponent,CourseGradebookAdminPageComponent],
  exports: [CoursesDashboardPageComponent, CourseSideBarComponent, IndividualCourseHomepageComponent, CourseSettingsPageComponent, CourseModulesPageComponent,AdminGradebookComponent,CourseGradebookAdminPageComponent],
  imports: [
    CommonModule, CoursesRoutingModule, CoreModule, CardModule, ButtonDirective, OverlayPanelModule, TableModule, DialogModule, Ripple, CheckboxModule, FormsModule, AvatarModule, CalendarModule, ScrollPanelModule, MultiSelectModule, PickListModule, MenuModule, CourseCardComponent, SkeletonModule, AccordionModule, BadgeModule, MenubarModule, StyleClassModule,
  ]
})
export class CoursesModule {}
