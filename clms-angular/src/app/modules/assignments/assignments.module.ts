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
import {CheckboxModule} from "primeng/checkbox";
import {EditorModule} from "primeng/editor";
import {DropdownModule} from "primeng/dropdown";
import {QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent} from "ngx-quill";
import {
    QuestionQuillEditorComponent
} from "@modules/assignments/components/question-quill-editor/question-quill-editor.component";

import {TableModule} from "primeng/table";
import {Ripple} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";

import {
  AssignmentAttemptPageComponent
} from "@modules/assignments/pages/assignment-attempt-page/assignment-attempt-page.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {
    QuestionViewComponentComponent
} from "@modules/assignments/components/question-view-component/question-view-component.component";
import {GradeComponentComponent} from "@modules/assignments/components/grade-component/grade-component.component";
import {ProgressBarModule} from "primeng/progressbar";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [AssignmentOverviewPageComponent, AssignmentEditPageComponent, QuestionEditorViewComponent, AssignmentAttemptPageComponent,GradeComponentComponent],
  exports: [AssignmentOverviewPageComponent, AssignmentEditPageComponent, QuestionEditorViewComponent,AssignmentAttemptPageComponent,GradeComponentComponent],
  imports: [
    CommonModule, AssignmentsRoutingModule, CoreModule, DatePipe, ButtonDirective, Button, CourseCardComponent, SkeletonModule, OrderListModule, InputGroupModule, FormsModule, CalendarModule, DialogModule, CheckboxModule, EditorModule, DropdownModule, QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent, QuestionQuillEditorComponent, TableModule, Ripple, InputNumberModule, RadioButtonModule, ScrollPanelModule, QuestionViewComponentComponent, ProgressBarModule, CardModule
  ]
})
export class AssignmentsModule { }
