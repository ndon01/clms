import {Component, OnInit} from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import { DatePipe } from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'assignment-overview-page',
  templateUrl: './assignment-overview-page.component.html',
  styleUrl: './assignment-overview-page.component.css'
})
export class AssignmentOverviewPageComponent implements OnInit {
  assignmentId!: number;
  assignment!: AssignmentProjection;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.assignmentId = parseInt(id, 10)
      this.httpClient.get<AssignmentProjection>(`/api/assignments/${id}`).subscribe(assignment => {
        this.assignment = assignment;
      });
    });
  }

  editAssignment() {
    this.router.navigate(["assignments", this.assignment.id, "edit"])
  }

  startAssignment() {
    this.httpClient.post(`/api/assignments/attempts/start-attempt`, {
      assignmentId: this.assignment.id
    }).subscribe(() => {
    });
  }
}
