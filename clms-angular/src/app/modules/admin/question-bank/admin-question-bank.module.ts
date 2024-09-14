import {NgModule} from "@angular/core";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {
  QuestionBankQuestionDashboardComponent
} from "@modules/admin/question-bank/dashboards/question-bank-question-dashboard/question-bank-question-dashboard.component";
import {MultiSelectModule} from "primeng/multiselect";
import {
  CreateQuestionModalComponent
} from "@modules/admin/question-bank/modals/create-question-modal/modal/create-question-modal.component";
import {
  CreateQuestionModalLauncherService
} from "@modules/admin/question-bank/modals/create-question-modal/launcher/create-question-modal-launcher.service";
import {
  QuestionBankDashboardComponent
} from "@modules/admin/question-bank/dashboards/question-bank-dashboard/question-bank-dashboard.component";
import {
  QuestionBankQuestionTableComponent
} from "@modules/admin/question-bank/components/question-bank-question-table/question-bank-question-table.component";
import {
  QuestionBankCategoryTableComponent
} from "@modules/admin/question-bank/components/question-bank-category-table/question-bank-category-table.component";
import {
  QuestionBankCategoryDashboardComponent
} from "@modules/admin/question-bank/dashboards/question-bank-category-dashboard/question-bank-category-dashboard.component";
import {
  CreateCategoryModalComponent
} from "@modules/admin/question-bank/modals/create-category-modal/modal/create-category-modal.component";
import {
  CreateCategoryModalLauncherService
} from "@modules/admin/question-bank/modals/create-category-modal/launcher/create-category-modal-launcher.service";
import {PrimeTemplate} from "primeng/api";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CreateQuestionModalComponent, QuestionBankQuestionTableComponent, QuestionBankCategoryTableComponent, QuestionBankQuestionDashboardComponent, QuestionBankCategoryDashboardComponent, QuestionBankDashboardComponent, CreateCategoryModalComponent],
  exports: [CreateQuestionModalComponent, QuestionBankQuestionTableComponent, QuestionBankCategoryTableComponent, QuestionBankQuestionDashboardComponent, QuestionBankCategoryDashboardComponent, QuestionBankDashboardComponent, CreateCategoryModalComponent],
  imports: [
    ButtonDirective,
    PrimeTemplate,
    CardModule,
    FormsModule,
    MultiSelectModule,
    TableModule,
    TagModule
  ],
  providers: [CreateQuestionModalLauncherService, CreateCategoryModalLauncherService]
})
export class AdminQuestionBankModule { }
