import {Component, OnInit} from '@angular/core';
import {ClientService} from "@core/services/client/client.service";
import {User, UserProjection} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";
import {SidebarPageWrapperComponent} from "@core/components/sidebar-page-wrapper/sidebar-page-wrapper.component";
import {CourseProjection} from "@modules/courses/model/course.model";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  client: UserProjection | null = null
  myCourses: CourseProjection[] = []

  constructor(private clientService: ClientService, private httpClient: HttpClient) {
    this.client = clientService.getUser()
  }

  ngOnInit() {
    this.httpClient.get<CourseProjection[]>('/api/courses/getMyCourses').subscribe(data => {
      this.myCourses = data
    })
  }

}
