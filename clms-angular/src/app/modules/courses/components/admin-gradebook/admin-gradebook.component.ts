import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {AssignmentAttemptProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";
import {UserDetails, UserDetailsProjection} from "@modules/courses/model/assignment-user.model";
import {TutorGradebookProjection} from "@modules/courses/model/tutor-gradebook";
interface Student {
  id: number;
  name: string;
}

interface Assignment {
  id: number;
  name: string;
}

interface Grade {
  studentId: number;
  grades: { assignmentId: number; grade: number }[];
}
type Severity = "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined;

@Component({
  selector: 'app-admin-gradebook',
  templateUrl: './admin-gradebook.component.html',
  styleUrl: './admin-gradebook.component.css'
})
export class AdminGradebookComponent implements OnInit{
  private courseId: number |undefined;
  private tutorGradebookView: TutorGradebookProjection | null = null;
  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService
              ) {
  }
  students: Student[] = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Ross' },
    { id: 5, name: 'Ethan Hunt' },
  ];

  assignments: Assignment[] = [
    { id: 1, name: 'Essay 1' },
    { id: 2, name: 'Quiz 1' },
    { id: 3, name: 'Midterm' },
    { id: 4, name: 'Project' },
    { id: 5, name: 'Final Exam' },
  ];

  grades: Grade[] = [];

  ngOnInit(): void {
    this.grades = this.generateGrades();
    this.activatedRoute.params.subscribe(params => {
      const courseId = params['id'];
      this.courseId = parseInt(courseId, 10);
      this.fetchAllAssignmentAndAllAttempts();
    });

  }

  fetchAllAssignmentAndAllAttempts() {
    if (!this.courseId){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Course ID not found'});
      return;
    }
    const params = new HttpParams().set('courseId', this.courseId.toString());

    this.httpClient.get<TutorGradebookProjection>('/api/courses/gradebook/getTutorView', { params })
      .subscribe(async tutorGradebook => {
        const userAttemptMapWithNames = await this.mapUsersToAssignmentAttemptsWithNames(tutorGradebook);
        this.tutorGradebookView = tutorGradebook;
        console.log("User name to Assignment Attempts map", userAttemptMapWithNames);
      });
  }

  async fetchUserDetails(userId: number): Promise<UserDetailsProjection | {}> {
    try {
      const response :UserDetailsProjection | undefined= await this.httpClient.get<UserDetailsProjection>(`/api/v1/users/${userId}`).toPromise();
      return response ?? {}; // Return an empty object if response is undefined
    } catch (error) {
      console.error(`Error fetching details for user ${userId}`, error);
      return {}; // Return an empty object if there was an error
    }
  }
  async mapUsersToAssignmentAttemptsWithNames(tutorGradebookView: TutorGradebookProjection): Promise<Map<string, AssignmentAttemptProjection[]>> {
    const userAttemptMap = new Map<string, AssignmentAttemptProjection[]>();
    if (!tutorGradebookView.allAttempts){return userAttemptMap;}

    for (const attempt of tutorGradebookView.allAttempts) {
      const userId = attempt.user?.id;

      if (!userId) {
        console.warn('Attempt does not have a user ID', attempt);
        continue;
      }
      // Fetch user details
      const userDetails:UserDetailsProjection= await this.fetchUserDetails(userId);
      if (!userDetails) {
        console.warn('User details not found for user ID', userId);
        continue;
      }
      if(!userDetails.firstName || !userDetails.lastName){
        console.warn('User details are missing first or last name', userDetails);
        continue;
      }
      const userKey = `${userDetails.firstName ?? ''} ${userDetails.lastName ?? ''}`.trim();

      // Initialize array if the userKey does not exist in the map
      if (!userAttemptMap.has(userKey)) {
        userAttemptMap.set(userKey, []);
      }

      userAttemptMap.get(userKey)!.push(attempt);
    }

    return userAttemptMap;
  }
  mapUsersToAssignmentAttempts(tutorGradebookView: TutorGradebookProjection):Map<number, AssignmentAttemptProjection[]>{
    const userAttemptMap = new Map<number,AssignmentAttemptProjection[]>();
    tutorGradebookView.allAttempts?.forEach(attempt =>{
      const userId = attempt.user?.id;

      if(!userAttemptMap.has(<number>userId)){
        if (typeof userId === "number") {
          userAttemptMap.set(userId, []);
        }
      }
      if (typeof userId === "number") {
        userAttemptMap.get(userId)?.push(attempt);
      }
    });
    return userAttemptMap;
  }

  generateGrades(): Grade[] {
    return this.students.map(student => ({
      studentId: student.id,
      grades: this.assignments.map(assignment => ({
        assignmentId: assignment.id,
        grade: Math.floor(Math.random() * 41) + 60,
      })),
    }));
  }

  getGrade(studentId: number, assignmentId: number): string | undefined {
    return this.grades
      .find(g => g.studentId === studentId)
      ?.grades.find(g => g.assignmentId === assignmentId)?.grade.toString();
  }

  getGradeColor(grade: string | undefined): Severity {
    const numericGrade = grade !== undefined ? parseInt(grade) : NaN;
    if (isNaN(numericGrade)) return 'danger'; // Handle undefined or invalid numbers
    if (numericGrade >= 90) return 'success';
    if (numericGrade >= 80) return 'info';
    if (numericGrade >= 70) return 'warning';
    return 'danger';
  }

}
