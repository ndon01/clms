import {NgModule} from "@angular/core";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {PrimeTemplate} from "primeng/api";
import {
  UserDashboardComponent
} from "@modules/admin/users/dashboards/user-dashboard/user-dashboard.component";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {AdminQuestionBankModule} from "@modules/admin/question-bank/admin-question-bank.module";

@NgModule({
  declarations: [UserDashboardComponent],
  exports: [UserDashboardComponent],
  imports: [
    ButtonDirective,
    PrimeTemplate,
    CardModule,
    TableModule,
    TagModule,
    NgForOf,
    FormsModule,
    MultiSelectModule,
  ],
  providers: []
})
export class UserAdminModule { }
