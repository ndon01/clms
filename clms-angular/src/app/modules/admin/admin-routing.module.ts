import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {
  QuestionBankDashboardComponent
} from "@modules/admin/question-bank/dashboards/question-bank-dashboard/question-bank-dashboard.component";
import {DashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

