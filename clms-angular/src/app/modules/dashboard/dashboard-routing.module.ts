import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardPageComponent} from "@modules/dashboard/pages/dashboard-page/dashboard-page.component";



const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
