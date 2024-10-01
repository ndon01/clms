import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "@modules/public/landing-page/landing-page.component";
import {
  CoursesDashboardPageComponent
} from "@modules/courses/pages/courses-dashboard-page/courses-dashboard-page.component";
import {IndividualCourseHomepageComponent} from "@modules/courses/pages/individual-course-homepage/individual-course-homepage.component";
import {CourseSettingsPageComponent} from "@modules/courses/pages/course-settings-page/course-settings-page.component";

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
          { path: 'home', component: IndividualCourseHomepageComponent},
          { path: 'settings', component: CourseSettingsPageComponent },
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
