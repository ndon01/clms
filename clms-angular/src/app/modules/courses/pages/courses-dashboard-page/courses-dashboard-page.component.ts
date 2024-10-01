import {Component, OnInit} from '@angular/core';
import {CourseProjection} from "@modules/courses/model/course.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'courses-dashboard-page',
  templateUrl: './courses-dashboard-page.component.html',
  styleUrl: './courses-dashboard-page.component.css'
})
export class CoursesDashboardPageComponent implements OnInit {

  allCourses: CourseProjection[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<CourseProjection[]>('/api/courses').subscribe(courses => {
      this.allCourses = courses;
    });
  }
}
