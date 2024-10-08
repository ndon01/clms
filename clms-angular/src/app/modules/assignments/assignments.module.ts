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
import {CourseCardComponent} from "@modules/dashboard/pages/components/course-card/course-card.component";
import {SkeletonModule} from "primeng/skeleton";
import {OrderListModule} from "primeng/orderlist";
import {
    QuestionEditorViewComponent
} from "@modules/assignments/components/question-editor-view/question-editor-view.component";
import {InputGroupModule} from "primeng/inputgroup";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";



@NgModule({
  declarations: [AssignmentOverviewPageComponent, AssignmentEditPageComponent],
  exports: [AssignmentOverviewPageComponent, AssignmentEditPageComponent],
    imports: [
        CommonModule, AssignmentsRoutingModule, CoreModule, DatePipe, ButtonDirective, Button, CourseCardComponent, SkeletonModule, OrderListModule, QuestionEditorViewComponent, InputGroupModule, FormsModule, CalendarModule, DialogModule
    ]
})
export class AssignmentsModule { }
