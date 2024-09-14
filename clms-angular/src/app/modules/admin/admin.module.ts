import {NgModule} from "@angular/core";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {AdminQuestionBankModule} from "@modules/admin/question-bank/admin-question-bank.module";
import {UserAdminModule} from "@modules/admin/users/user-admin.module";
import {AdminDashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  imports: [AdminRoutingModule, UserAdminModule, AdminQuestionBankModule],
  providers: []
})
export class AdminModule { }
