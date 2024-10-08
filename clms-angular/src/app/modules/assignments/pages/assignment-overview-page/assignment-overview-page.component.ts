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
  assignment!: AssignmentProjection;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.httpClient.get<AssignmentProjection>(`/api/assignments/${id}`).subscribe(assignment => {
        this.assignment = assignment;
      });
    });
  }


  startAssignment() {

  }

  editAssignment() {
    this.router.navigate(["assignments", this.assignment.id, "edit"])
  }
}
