import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {PublicRoutingModule} from "@modules/public/public-routing.module";
import {NavbarComponent} from "@core/components/navbar/navbar.component";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {UserManagementComponent} from "@modules/admin/pages/user-management/user-management.component";
import {UsersTableComponent} from "@modules/admin/pages/user-management/users-table/users-table.component";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {ButtonComponent} from "@core/components/button/button.component";
import {AddUserModalComponent} from "@modules/admin/pages/user-management/add-user-modal/add-user-modal.component";



@NgModule({
  declarations: [UserManagementComponent],
  exports: [UserManagementComponent],
  imports: [
    CommonModule, AdminRoutingModule, UsersTableComponent, CardModule, ButtonDirective, Button, ToolbarModule, PaginatorModule, ButtonComponent, AddUserModalComponent
  ]
})
export class AdminModule { }
