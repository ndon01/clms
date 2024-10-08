import {Component, OnInit} from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'courses-course-assignments-page',
  templateUrl: './course-assignments-page.component.html',
  styleUrl: './course-assignments-page.component.css'
})
export class CourseAssignmentsPageComponent implements OnInit {
  courseAssignments: AssignmentProjection[] = [];
  courseId!: number;


  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Get the value of 'id' parameter
      if (!id) {
        return;
      }
      this.courseId = parseInt(id, 10); // Convert the value to a number
    });
    // Fetch assignments from API
    this.loadAssignments();
  }

  loadAssignments() {
    this.httpClient.get<AssignmentProjection[]>(`/api/courses/${this.courseId}/assignments`).subscribe(assignments => {
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

    // Post new assignment to API
    this.httpClient.post<AssignmentProjection>(`/api/courses/${this.courseId}/assignments/create`, this.newAssignment).subscribe(newAssignment => {
      this.loadAssignments();
    });

    // Clear new assignment form
    this.newAssignment = {
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date()
    };
  }

  viewAssignment(assignment: AssignmentProjection) {
    this.router.navigate(["assignments", assignment.id]);
  }
}
