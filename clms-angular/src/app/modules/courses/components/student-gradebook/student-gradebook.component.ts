import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AssignmentProjection } from "@modules/assignments/model/assignment.model";
import { AssignmentAttemptProjection } from "@modules/assignments/model/assignment-attempt-answer.modal";
import { TagModule } from "primeng/tag";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TableModule } from "primeng/table";
import { DatePipe } from "@angular/common";

interface Student {
  id: number;
  name: string;
}

type Severity = "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined;

@Component({
  selector: 'app-student-gradebook',
  templateUrl: './student-gradebook.component.html',
  styleUrls: ['./student-gradebook.component.css']
})
export class StudentGradebookComponent implements OnInit {

  private courseId: number | undefined;
  private studentId: number | undefined;
  assignments: AssignmentProjection[] = [];
  attempts: AssignmentAttemptProjection[] = [];
  assignmentAttemptMap = new Map<number, AssignmentAttemptProjection>();

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const courseId = params['id'];
      this.courseId = parseInt(courseId, 10);
      this.getCurrentUser().then(() =>{
        this.fetchStudentGradebook(this.courseId!, this.studentId!);
      });
    });
  }
  getCurrentUser():Promise<void>{
    return new Promise((resolve)=>{
      this.httpClient.get<any>('/api/v1/users/client').subscribe(data => {
        this.studentId = data.id;
        resolve();
      });
    })
  }

  fetchStudentGradebook(courseId: number, studentId: number) {
    const params = new HttpParams()
      .set('courseId', courseId.toString())
      .set('studentId', studentId.toString());

    this.httpClient.get<any>('/api/courses/gradebook/getStudentView', { params })
      .subscribe(data => {
        this.assignments = data.assignments.map((assignment: any) => ({
          id: assignment.id,
          name: assignment.name,
          dueDate: assignment.dueDate
        }));

        this.attempts = data.attempts.map((attempt: any) => ({
          id: attempt.id,
          assignment: {
            id: attempt.assignment.id,
            name: attempt.assignment.name,
            dueDate: attempt.assignment.dueDate
          },
          status: attempt.status,
          scorePercentage: attempt.scorePercentage
        }));

        // Populate the assignmentAttemptMap for quick lookup
        this.assignmentAttemptMap.clear();
        this.attempts.forEach(attempt => {
          this.assignmentAttemptMap.set(attempt.assignment!.id!, attempt);
        });
      });
  }

  getStatus(assignmentId: number): string {
    const attempt = this.assignmentAttemptMap.get(assignmentId);
    const status = attempt?.status ?? 'Not Attempted';
    return this.capitalizeFirstLetter(status.toLowerCase());
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  getGrade(assignmentId: number): string {
    const attempt = this.assignmentAttemptMap.get(assignmentId);
    return attempt && attempt.scorePercentage !== null ? `${attempt!.scorePercentage!.toFixed(1)}%` : 'N/A';
  }

  getGradeColor(grade: string): Severity {
    console.log("Grade:", grade)
    if (grade === 'N/A') return 'info';
    const numericGrade = parseFloat(grade);
    if (numericGrade >= 90) return 'success';
    if (numericGrade >= 80) return 'success';
    if (numericGrade >= 70) return 'warning';
    if (numericGrade >= 60) return 'warning';
    return 'danger';
  }
  navigateToAssignmentOverview(assignmnetId:number | undefined,grade:string){
    if(assignmnetId){
      this.router.navigate([`/assignments/${assignmnetId}/overview`]);
    }
  }
}
