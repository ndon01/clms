import { Component, OnInit } from '@angular/core';
import { AssignmentProjection } from "@modules/assignments/model/assignment.model";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import {AssignmentAttemptProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";

@Component({
  selector: 'assignment-overview-page',
  templateUrl: './assignment-overview-page.component.html',
  styleUrls: ['./assignment-overview-page.component.css']
})
export class AssignmentOverviewPageComponent implements OnInit {
  assignmentId!: number;
  assignment!: AssignmentProjection;
  attempts: AssignmentAttemptProjection[] = [];
  selectedAttempt: AssignmentAttemptProjection | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.assignmentId = parseInt(params['id'], 10);
      this.loadAssignmentDetails();
      this.loadAttempts();
    });
  }

  loadAssignmentDetails() {
    this.httpClient.get<AssignmentProjection>(`/api/assignments/getAssignmentDetails`, {
      params: { assignmentId: this.assignmentId }
    }).subscribe(assignment => {
      this.assignment = assignment;
    });
  }

  loadAttempts() {
    this.httpClient.get<AssignmentAttemptProjection[]>(`/api/assignments/attempts/client`, {
      params: { assignmentId: this.assignmentId.toString() }
    }).subscribe(attempts => {
       attempts.forEach(attempt =>{
         attempt.scorePercentage = attempt.scorePercentage ? parseInt(attempt.scorePercentage.toFixed(2)) : 0;
      });
       this.attempts = attempts;
       this.sortAttempts();

      if (this.attempts.length > 0) {
        this.selectedAttempt = this.attempts[0];
      }
    });
  }

  viewAttempt(attempt: AssignmentAttemptProjection) {
    this.selectedAttempt = attempt;
  }

  editAssignment() {
    this.router.navigate(["assignments", this.assignment.id, "edit"]);
  }

  startAssignment() {
    this.httpClient.post(`/api/assignments/attempts/start-attempt`, {
      assignmentId: this.assignment.id
    }, {
      observe: 'response',
      responseType: 'text'
    }).pipe(tap(response => {
      if (response.status === 201 || response.status === 302) {
        this.router.navigate(["assignments", this.assignment.id, "attempt"]);
      }
    })).subscribe();
  }

  GetQuestionFromQuestionId(questionId: number) {
    if (!this.selectedAttempt || !this.selectedAttempt.assignment || !this.selectedAttempt.assignment.questions) return null;
    return this.selectedAttempt.assignment.questions.find(question => question.id === questionId);
  }
  sortAttempts() {
    this.attempts.sort((a, b) => {
      if (!a.submittedAt && !b.submittedAt) return 0;
      if(!a.submittedAt) return 1;
      if(!b.submittedAt) return -1;
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      });
  }
}
