// assignment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = 'http://localhost/api/assignments'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all assignments
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }
}
