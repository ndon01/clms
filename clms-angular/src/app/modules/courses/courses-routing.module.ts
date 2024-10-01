import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {
  CoursesDashboardPageComponent
} from "@modules/courses/pages/courses-dashboard-page/courses-dashboard-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: CoursesDashboardPageComponent },

      // Individual Courses
      {
        path: ':id',
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full'},
          { path: 'home', component: CoursesDashboardPageComponent},
          { path: '**', redirectTo: 'home' }
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
export class CoursesRoutingModule { }
