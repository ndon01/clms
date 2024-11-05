import {Component, OnInit} from '@angular/core';
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
