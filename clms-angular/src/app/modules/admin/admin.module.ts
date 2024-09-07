import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {PublicRoutingModule} from "@modules/public/public-routing.module";
import {NavbarComponent} from "@core/components/navbar/navbar.component";
import {AdminRoutingModule} from "@modules/admin/admin-routing.module";
import {UserManagementComponent} from "@modules/admin/pages/user-management/user-management.component";



@NgModule({
  declarations: [UserManagementComponent],
  exports: [UserManagementComponent],
  imports: [
    CommonModule, AdminRoutingModule
  ]
})
export class AdminModule { }
