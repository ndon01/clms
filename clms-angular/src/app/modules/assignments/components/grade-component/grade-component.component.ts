import {Component, Input, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {FileUploadModule} from "primeng/fileupload";
import {AssignmentAttemptProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";

@Component({
  selector: 'app-grade-component',
  templateUrl: './grade-component.component.html',
  styleUrl: './grade-component.component.css'
})
export class GradeComponentComponent implements OnInit{
  ngOnInit() {
  }

  @Input() assignmentAttemptProjection?: AssignmentAttemptProjection;
  @Input() attemptNumber?:Number;
  maxGrade :number = 100;
  calculateTimeToTakeAttempt(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);

    return this.timeDifference(start, end)
  }
  timeDifference(startTime, endTime) {
    // Calculate the difference in milliseconds
    const diffMs = Math.abs(endTime - startTime);

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    // Build the result string dynamically based on non-zero values
    let result: string[] = [];
    if (days > 0) result.push(`${days}D`);
    if (hours > 0) result.push(`${hours}H`);
    if (minutes > 0) result.push(`{MINUTES}m`);
    if (seconds > 0) result.push(`${seconds}S`);

    return result.join(' ') || "0S"; // Return "0S" if all values are zero
  }
}
