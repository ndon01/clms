import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardPageComponent} from "@modules/dashboard/pages/dashboard-page/dashboard-page.component";
import {
  QuestionGenerationPageComponent
} from "@modules/question-generation/pages/question-generation-page/question-generation-page.component";
import {
  OrderOverviewPageComponent
} from "@modules/question-generation/pages/order-overview-page/order-overview-page.component";
import {
  QuestionGenerationComponent
} from "@modules/question-generation/components/question-generation/question-generation.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path:'orders',
        component: QuestionGenerationPageComponent
      },
      {
        path: ':id',
        children:[
          {path:'',redirectTo:'overview',pathMatch:'full'},
          {path:'overview',component: OrderOverviewPageComponent}
        ]
      }

    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionGenerationRoutingModule {}
