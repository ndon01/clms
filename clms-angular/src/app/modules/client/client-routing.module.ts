import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  QuestionBankDashboardComponent
} from "@modules/question-bank/pages/question-bank-dashboard/question-bank-dashboard.component";
import {ClientSettingsPageComponent} from "@modules/client/pages/client-settings-page/client-settings-page.component";

export const routes: Routes = [
  {
    path: 'settings',
    component: ClientSettingsPageComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
