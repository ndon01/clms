import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {PublicRoutingModule} from "@modules/public/public-routing.module";
import {NavbarComponent} from "@core/components/navbar/navbar.component";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {UserManagementComponent} from "@modules/admin/pages/user-management/user-management.component";
import {UsersTableComponent} from "@modules/admin/users/users-table/users-table.component";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {ButtonComponent} from "@core/components/button/button.component";
import {DialogModule} from "primeng/dialog";
import {EditUserComponent} from "@modules/admin/users/edit-user/edit-user.component";
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [UserManagementComponent, UsersTableComponent],
  exports: [UserManagementComponent],
  imports: [
    CommonModule, AdminRoutingModule, CardModule, ButtonDirective, Button, ToolbarModule, PaginatorModule, ButtonComponent, EditUserComponent, DialogModule, TagModule, TableModule
  ]
})
export class AdminModule { }
