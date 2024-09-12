import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {PublicRoutingModule} from "@modules/public/public-routing.module";
import {NavbarComponent} from "@core/components/navbar/navbar.component";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {UserManagementComponent} from "@modules/admin/users/user-management/user-management.component";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {ButtonComponent} from "@core/components/button/button.component";
import {DialogModule} from "primeng/dialog";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {DashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";
import {EditUserModalComponent} from "@modules/admin/users/edit-user-modal/modal/edit-user-modal.component";
import {
  EditUserModalLauncherService
} from "@modules/admin/users/edit-user-modal/launcher/edit-user-modal-launcher.service";
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {CreateUserModalComponent} from "@modules/admin/users/create-user-modal/modal/create-user-modal.component";
import {SharedModule} from "@shared/shared.module";
import {
  CreateUserModalLauncherService
} from "@modules/admin/users/create-user-modal/launcher/create-user-modal-launcher.service";
import {ChipsModule} from "primeng/chips";
import {AutoCompleteModule} from "primeng/autocomplete";
import {UserFormComponent} from "@modules/admin/users/components/user-form/user-form.component";
import {
  UsersTableUserRowComponent
} from "@modules/admin/users/components/users-table-user-row/users-table-user-row.component";
import {UsersTableComponent} from "@modules/admin/users/components/users-table/users-table.component";

@NgModule({
  declarations: [UserManagementComponent, UsersTableComponent, DashboardComponent, EditUserModalComponent, CreateUserModalComponent, UserFormComponent, UsersTableUserRowComponent],
  exports: [UserManagementComponent, UsersTableComponent, DashboardComponent, EditUserModalComponent, CreateUserModalComponent, UserFormComponent, UsersTableUserRowComponent],
  imports: [
    CommonModule, AdminRoutingModule, CardModule, ButtonDirective, Button, ToolbarModule, PaginatorModule, ButtonComponent, DialogModule, TagModule, TableModule, SharedModule, ChipsModule, AutoCompleteModule
  ],
  providers: [EditUserModalLauncherService, CreateUserModalLauncherService]
})
export class AdminModule { }
