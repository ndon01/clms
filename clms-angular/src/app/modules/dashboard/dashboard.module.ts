import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardPageComponent} from "@modules/dashboard/pages/dashboard-page/dashboard-page.component";
import {CoreModule} from "@core/core.module";
import {DashboardRoutingModule} from "@modules/dashboard/dashboard-routing.module";




@NgModule({
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
