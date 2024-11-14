import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardPageComponent} from "@modules/dashboard/pages/dashboard-page/dashboard-page.component";
import {CoreModule} from "@core/core.module";
import {DashboardRoutingModule} from "@modules/dashboard/dashboard-routing.module";
import {Header} from "primeng/api";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {AvatarModule} from "primeng/avatar";
import {CourseCardComponent} from "@modules/dashboard/pages/components/course-card/course-card.component";
import {SkeletonModule} from "primeng/skeleton";
import {
  AssignmentsListComponent
} from "@modules/dashboard/pages/components/assignments-list/assignments-list.component";
import {
  QuestionGenerationComponent
} from "@modules/question-generation/components/question-generation/question-generation.component";
import {
  QuestionGenerationPageComponent
} from "@modules/question-generation/pages/question-generation-page/question-generation-page.component";
import {QuestionGenerationRoutingModule} from "@modules/question-generation/question-generation-routing.module";




@NgModule({
  declarations: [QuestionGenerationPageComponent],
  exports: [QuestionGenerationPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    QuestionGenerationRoutingModule,
    Header,
    CardModule,
    CalendarModule,
    ScrollPanelModule,
    CheckboxModule,
    FormsModule,
    AvatarModule,
    CourseCardComponent,
    SkeletonModule,
    AssignmentsListComponent,
    QuestionGenerationComponent,
  ]
})
export class QuestionGenerationModule { }
