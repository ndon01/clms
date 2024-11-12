import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  QuestionBankDashboardComponent
} from "@modules/question-bank/pages/question-bank-dashboard/question-bank-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: QuestionBankDashboardComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionBankRoutingModule {}
