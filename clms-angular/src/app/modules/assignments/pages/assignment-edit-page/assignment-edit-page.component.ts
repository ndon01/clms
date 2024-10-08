import { Component } from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'assignment-edit-page',
  templateUrl: './assignment-edit-page.component.html',
  styleUrl: './assignment-edit-page.component.css'
})
export class AssignmentEditPageComponent {
  assignment!: AssignmentProjection;

  constructor(private router: Router, private location: Location) {
    this.assignment = {
      id: 1,
      name: 'Assignment 1',
      description: 'This is the first assignment',
      startDate: new Date(),
      dueDate: new Date(),
    }
  }

  goBack() {
    this.location.back();
  }
}
