import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "@modules/admin/pages/dashboard/dashboard.component";
import {QuestionBankComponent} from "@modules/admin/pages/dashboard/question-bank/question-bank.component";
import {UsersComponent} from "@modules/admin/pages/dashboard/users/users.component";
import {PageNotFoundComponent} from "@core/pages/page-not-found/page-not-found.component";
import {CoursesDashboardComponent} from "@modules/admin/courses/courses-dashboard/courses-dashboard.component";
import {
  CreateQuestionComponent
} from "@modules/admin/question-bank/dashboards/create-question/create-question.component";

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'question-bank', component: QuestionBankComponent },
      {path:"create-question", component: CreateQuestionComponent},
      { path: 'courses', component: CoursesDashboardComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

