import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardPageComponent} from "@modules/dashboard/pages/dashboard-page/dashboard-page.component";
import {CoreModule} from "@core/core.module";
import {DashboardRoutingModule} from "@modules/dashboard/dashboard-routing.module";
import {Header} from "primeng/api";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {AvatarModule} from "primeng/avatar";




@NgModule({
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule,
    Header,
    CardModule,
    CalendarModule,
    ScrollPanelModule,
    CheckboxModule,
    FormsModule,
    AvatarModule,
  ]
})
export class DashboardModule { }
