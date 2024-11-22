import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  QuestionBankDashboardComponent
} from "@modules/question-bank/pages/question-bank-dashboard/question-bank-dashboard.component";
import {QuestionBankRoutingModule} from "@modules/question-bank/question-bank-routing.module";
import {TreeModule} from "primeng/tree";
import {
  CategoryTreeViewComponent
} from "@modules/question-bank/components/category-tree-view/category-tree-view.component";
import {DataViewModule} from "primeng/dataview";
import {ClientRoutingModule} from "@modules/client/client-routing.module";
import {ClientSettingsPageComponent} from "@modules/client/pages/client-settings-page/client-settings-page.component";
import {Button} from "primeng/button";




@NgModule({
  declarations: [ClientSettingsPageComponent],
  exports: [ClientSettingsPageComponent],
  imports: [
    ClientRoutingModule,
    Button,
    CoreModule
  ]
})
export class ClientModule { }
