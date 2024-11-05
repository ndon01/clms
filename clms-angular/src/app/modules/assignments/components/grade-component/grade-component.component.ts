import {Component, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {FileUploadModule} from "primeng/fileupload";

@Component({
  selector: 'app-grade-component',
  templateUrl: './grade-component.component.html',
  styleUrl: './grade-component.component.css'
})
export class GradeComponentComponent implements OnInit{
  ngOnInit() {
    console.log("GRADE"+ this.grade)
    console.log("STATUS"+ this.status)
  }

  @Input() studentName: string = "John Doe";
  @Input() assignmentName: string = "Introduction to React";
  @Input() grade: number = 85;
  maxGrade: number = 100;
  @Input() dueDate: string = "2023-11-15";
  @Input() submissionDate: string = "2023-11-14";
  @Input() status:string = "";


  get formattedDueDate(): string {
    return new Date(this.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  get formattedSubmissionDate(): string {
    return new Date(this.submissionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getGradeColor(percentage: number): string {
    if (percentage >= 90) return "green";
    if (percentage >= 80) return "blue";
    if (percentage >= 70) return "yellow";
    return "red";
  }
}
