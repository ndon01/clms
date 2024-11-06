import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {AssignmentAttemptProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";
import {UserDetailsProjection} from "@modules/courses/model/assignment-user.model";
import {TutorGradebookProjection} from "@modules/courses/model/tutor-gradebook";
interface Student {
  id: number;
  name: string;
}

type Severity = "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined;

@Component({
  selector: 'app-admin-gradebook',
  templateUrl: './admin-gradebook.component.html',
  styleUrl: './admin-gradebook.component.css'
})
export class AdminGradebookComponent implements OnInit{
  private courseId: number | undefined;
  tutorGradebookView: TutorGradebookProjection | null = null;

  students: Student[] = [];
  assignments: { name: string | undefined; id: number | undefined }[] = [];
  grades: { studentId: number; grades: { grade: number | null; assignmentId: number | undefined }[] }[] = [];

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const courseId = params['id'];
      this.courseId = parseInt(courseId, 10);
      this.fetchAllAssignmentAndAllAttempts();
    });
  }


  fetchAllAssignmentAndAllAttempts() {
    if (!this.courseId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Course ID not found' });
      return;
    }

    const params = new HttpParams().set('courseId', this.courseId.toString());

    this.httpClient.get<TutorGradebookProjection>('/api/courses/gradebook/getTutorView', { params })
      .subscribe(async tutorGradebook => {
        this.tutorGradebookView = tutorGradebook;

        const userAttemptMapWithNames = await this.mapUsersToAssignmentAttemptsWithNames(tutorGradebook);
        this.populateGradebook(userAttemptMapWithNames);
        console.log("User name to Assignment Attempts map", userAttemptMapWithNames);
      });
  }
  async fetchUserDetails(userId: number): Promise<UserDetailsProjection | {}> {
    try {
      const response: UserDetailsProjection | undefined = await this.httpClient.get<UserDetailsProjection>(`/api/v1/users/${userId}`).toPromise();
      return response ?? {}; // Return an empty object if response is undefined
    } catch (error) {
      console.error(`Error fetching details for user ${userId}`, error);
      return {}; // Return an empty object if there was an error
    }
  }
  async fetchAllUserDetails(userIds: (number | undefined)[]): Promise<UserDetailsProjection[]> {
    const params = new HttpParams().set('userIds', userIds.join(','));
    return this.httpClient.get<UserDetailsProjection[]>('/api/v1/users/batch', { params }).toPromise()
      .then(response => response || [])  // Fallback to an empty array if response is undefined
      .catch(error => {
        console.error("Error fetching user details:", error);
        return [];  // Return an empty array in case of an error
      });
  }


  async mapUsersToAssignmentAttemptsWithNames(tutorGradebookView: TutorGradebookProjection): Promise<Map<string, AssignmentAttemptProjection[]>> {
    const userAttemptMap = new Map<string, AssignmentAttemptProjection[]>();

    // Collect all unique user IDs
    const userIds = Array.from(new Set(tutorGradebookView.allAttempts?.map(attempt => attempt.user?.id).filter(Boolean)));

    // Fetch all user details in a single request
    const userDetailsList: UserDetailsProjection[] = await this.fetchAllUserDetails(userIds);

    // Create a map of user ID to user details
    const userDetailsMap = new Map(userDetailsList.map(user => [user.id, user]));

    // Populate the userAttemptMap using the userDetailsMap
    for (const attempt of tutorGradebookView.allAttempts || []) {
      const userId = attempt.user?.id;
      if (!userId) continue;

      const userDetails = userDetailsMap.get(userId);
      if (!userDetails?.firstName || !userDetails?.lastName) continue;

      const userKey = `${userDetails.firstName} ${userDetails.lastName}`;
      if (!userAttemptMap.has(userKey)) {
        userAttemptMap.set(userKey, []);
      }
      userAttemptMap.get(userKey)!.push(attempt);
    }

    return userAttemptMap;
  }


  populateGradebook(userAttemptMapWithNames: Map<string, AssignmentAttemptProjection[]>) {
    this.students = Array.from(userAttemptMapWithNames.keys()).map((name, index) => ({ id: index + 1, name }));
    if (!this.tutorGradebookView) return;
    this.assignments = (this.tutorGradebookView.allAssignments || []).map(assignment => ({
      id: assignment.id,
      name: assignment.name
    })) || [];

    this.grades = Array.from(userAttemptMapWithNames.entries()).map(([name, attempts]) => {
      const student = this.students.find(s => s.name === name);
      const grades = this.assignments.map(assignment => {
        const attempt = attempts.find(a => a.assignment!.id === assignment.id);
        return {
          assignmentId: assignment.id,
          grade: attempt ?  Math.floor(attempt.scorePercentage!): null
        };
      });
      return { studentId: student?.id || 0, grades };
    });
  }

  getGrade(studentId: number, assignmentId: number | undefined): string {
    const grade = this.grades
      .find(g => g.studentId === studentId)
      ?.grades.find(g => g.assignmentId === assignmentId)?.grade;

    return grade !== null && grade !== undefined ? grade.toString() : "N/A";
  }



  getGradeColor(grade: string | undefined): Severity {
    const numericGrade = grade ? parseInt(grade) : NaN;
    console.log("numeric grade", numericGrade)
    if (isNaN(numericGrade)) {
      console.log("numeric grade NAN")
      return 'info';
    }
    if (numericGrade >= 90) return 'success';
    if (numericGrade >= 80) return 'success';
    if (numericGrade >= 70) return 'warning';
    if (numericGrade >= 60) return 'warning';
    return 'danger';
  }

}
