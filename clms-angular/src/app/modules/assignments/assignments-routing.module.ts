import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  IndividualCourseHomepageComponent
} from "@modules/courses/pages/individual-course-homepage/individual-course-homepage.component";
import {
  AssignmentOverviewPageComponent
} from "@modules/assignments/pages/assignment-overview-page/assignment-overview-page.component";
import {
  AssignmentEditPageComponent
} from "@modules/assignments/pages/assignment-edit-page/assignment-edit-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: AssignmentOverviewPageComponent },
          { path: 'edit', component: AssignmentEditPageComponent },
          { path: '**', redirectTo: 'overview' }
        ]
      },

      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
