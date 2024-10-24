import {Component, OnInit} from '@angular/core';
import {ClientService} from "@core/services/client/client.service";
import {User, UserProjection} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";
import {SidebarPageWrapperComponent} from "@core/components/sidebar-page-wrapper/sidebar-page-wrapper.component";
import {CourseProjection} from "@modules/courses/model/course.model";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {map} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  client: UserProjection | null = null
  myCourses: CourseProjection[] = []
  myAssignments: AssignmentProjection[] = [];

  constructor(private clientService: ClientService, private httpClient: HttpClient) {
    this.client = clientService.getUser()
  }

  ngOnInit() {
    this.httpClient.get<CourseProjection[]>('/api/courses/getMyCourses').subscribe(data => {
      this.myCourses = data
      this.fetchAssignments()
    })


  }

  fetchAssignments() {
    const courseIds = this.myCourses.map(course => course.id);
    courseIds.forEach(courseId => {
      if (!courseId) {
        return;
      }

      this.httpClient.get<AssignmentProjection[]>(`/api/courses/getAllAssignmentsDetails`, {
        params: { courseId: courseId }
      }).pipe(map(assignments => {
        return assignments.map(assignment => {
          if (typeof assignment.startDate === 'string') {
            assignment.startDate = new Date(assignment.startDate);
          }
          if (typeof assignment.dueDate === 'string') {
            assignment.dueDate = new Date(assignment.dueDate);
          }
          return assignment;
        });
      })).subscribe((data) =>
      {
        this.myAssignments.push(...data)
      });
    });

  }

    protected readonly Array = Array;
  protected readonly print = print;
}
