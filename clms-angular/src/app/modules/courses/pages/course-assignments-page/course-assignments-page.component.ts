import {Component, OnInit} from '@angular/core';
import {AssignmentProjection} from "@modules/courses/model/assignment.model";
import {HttpClient} from "@angular/common/http";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'courses-course-assignments-page',
  templateUrl: './course-assignments-page.component.html',
  styleUrl: './course-assignments-page.component.css'
})
export class CourseAssignmentsPageComponent implements OnInit {
  courseAssignments: AssignmentProjection[] = [];

  constructor(private httpClient: HttpClient) {
  }


  ngOnInit() {
    // Fetch assignments from API
    this.httpClient.get<AssignmentProjection[]>('/api/assignments').subscribe(assignments => {
      this.courseAssignments = assignments;
    });
  }

  isAddAssignmentModalVisible: boolean = false;

  newAssignment: AssignmentProjection = {
    name: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date()
  };

  setAddAssignmentModalVisibility(visibility: boolean) {
    this.isAddAssignmentModalVisible = visibility;
  }

  addAssignmentModalCancel() {
    this.isAddAssignmentModalVisible = false;
  }

  addAssignmentModalSubmit() {
    this.isAddAssignmentModalVisible = false;
  }
}
