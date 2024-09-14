import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminDashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";


const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

