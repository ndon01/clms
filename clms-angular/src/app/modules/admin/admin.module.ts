import {NgModule} from "@angular/core";
import {UserManagementComponent} from "@modules/admin/users/views/user-management/user-management.component";
import {UsersTableComponent} from "@modules/admin/users/components/users-table/users-table.component";
import {DashboardComponent} from "@modules/admin/dashboard/dashboard.component";
import {EditUserModalComponent} from "@modules/admin/users/modals/edit-user-modal/modal/edit-user-modal.component";
import {
  CreateUserModalComponent
} from "@modules/admin/users/modals/create-user-modal/modal/create-user-modal.component";
import {UserFormComponent} from "@modules/admin/users/components/user-form/user-form.component";
import {
  UsersTableUserRowComponent
} from "@modules/admin/users/components/users-table-user-row/users-table-user-row.component";
import {CommonModule} from "@angular/common";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {DialogModule} from "primeng/dialog";
import {ButtonComponent} from "@shared/ui/button/button.component";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {SharedModule} from "@shared/shared.module";
import {ChipsModule} from "primeng/chips";
import {AutoCompleteModule} from "primeng/autocomplete";
import {
  EditUserModalLauncherService
} from "@modules/admin/users/modals/edit-user-modal/launcher/edit-user-modal-launcher.service";
import {
  CreateUserModalLauncherService
} from "@modules/admin/users/modals/create-user-modal/launcher/create-user-modal-launcher.service";

@NgModule({
  declarations: [UserManagementComponent, UsersTableComponent, DashboardComponent, EditUserModalComponent, CreateUserModalComponent, UserFormComponent, UsersTableUserRowComponent],
  exports: [UserManagementComponent, UsersTableComponent, DashboardComponent, EditUserModalComponent, CreateUserModalComponent, UserFormComponent, UsersTableUserRowComponent],
  imports: [
    CommonModule, AdminRoutingModule, CardModule, ButtonDirective, Button, ToolbarModule, PaginatorModule, ButtonComponent, DialogModule, TagModule, TableModule, SharedModule, ChipsModule, AutoCompleteModule
  ],
  providers: [EditUserModalLauncherService, CreateUserModalLauncherService]
})
export class AdminModule { }
