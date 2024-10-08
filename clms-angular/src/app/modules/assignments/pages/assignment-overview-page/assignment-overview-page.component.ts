import { Component } from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import { DatePipe } from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'assignment-overview-page',
  templateUrl: './assignment-overview-page.component.html',
  styleUrl: './assignment-overview-page.component.css'
})
export class AssignmentOverviewPageComponent {
  assignment!: AssignmentProjection;

  constructor(private router: Router) {
    this.assignment = {
      id: 1,
      name: 'Assignment 1',
      description: 'This is the first assignment',
      startDate: new Date(),
      dueDate: new Date(),
    }
  }


  startAssignment() {

  }

  editAssignment() {
    this.router.navigate(["assignments", this.assignment.id, "edit"])
  }
}
