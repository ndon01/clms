import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {SharedModule} from "@shared/shared.module";
import {ChipsModule} from "primeng/chips";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";
import {AdminQuestionBankModule} from "@modules/admin/question-bank/admin-question-bank.module";
import {SplitterModule} from "primeng/splitter";
import {PanelMenuModule} from "primeng/panelmenu";
import {AdminAuthorizationModule} from "@modules/admin/authorization/admin-authorization.module";
import {ButtonComponent} from "@core/components/button/button.component";
import {AdminUserModule} from "@modules/admin/users/admin-user.module";
import {DashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";
import {ListboxModule} from "primeng/listbox";
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    CommonModule, AdminRoutingModule, CardModule, ButtonDirective, Button, ToolbarModule, PaginatorModule, ButtonComponent, DialogModule, TagModule, TableModule, SharedModule, ChipsModule, AutoCompleteModule, MultiSelectModule, AdminQuestionBankModule, SplitterModule, PanelMenuModule, AdminAuthorizationModule, ButtonComponent, AdminUserModule, ListboxModule, MenubarModule
  ],
  providers: []
})
export class AdminModule { }
