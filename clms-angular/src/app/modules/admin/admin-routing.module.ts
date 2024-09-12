import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {UserManagementComponent} from "@modules/admin/pages/user-management/user-management.component";
import {DashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";

const routes: Routes = [
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/users', component: UserManagementComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

