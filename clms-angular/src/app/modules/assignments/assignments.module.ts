import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AssignmentsRoutingModule} from "@modules/assignments/assignments-routing.module";
import {
  AssignmentOverviewPageComponent
} from "@modules/assignments/pages/assignment-overview-page/assignment-overview-page.component";
import {CoreModule} from "@core/core.module";
import {Button, ButtonDirective} from "primeng/button";
import {
  AssignmentEditPageComponent
} from "@modules/assignments/pages/assignment-edit-page/assignment-edit-page.component";



@NgModule({
  declarations: [AssignmentOverviewPageComponent, AssignmentEditPageComponent],
  exports: [AssignmentOverviewPageComponent, AssignmentEditPageComponent],
  imports: [
    CommonModule, AssignmentsRoutingModule, CoreModule, DatePipe, ButtonDirective, Button
  ]
})
export class AssignmentsModule { }
