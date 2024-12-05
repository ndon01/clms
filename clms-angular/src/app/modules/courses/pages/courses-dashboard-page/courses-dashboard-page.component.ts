import {Component, OnInit} from '@angular/core';
import {CourseProjection} from "@modules/courses/model/course.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'courses-dashboard-page',
  templateUrl: './courses-dashboard-page.component.html',
  styleUrl: './courses-dashboard-page.component.css'
})
export class CoursesDashboardPageComponent implements OnInit {

  allCourses!: CourseProjection[];
  myCourses!: CourseProjection[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<CourseProjection[]>('/api/courses').subscribe(courses => {
      this.allCourses = courses;
    });

    this.httpClient.get<CourseProjection[]>('/api/courses/getMyCourses').subscribe(courses => {
      this.myCourses = courses;
    });
  }

  protected readonly Array = Array;
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
