import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {CourseProjection} from "@modules/courses/model/course.model";
import {DatePipe, KeyValuePipe, NgForOf} from "@angular/common";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {format} from "date-fns";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [
    TableModule,
    SelectButtonModule,
    NgForOf,
    CardModule,
    CheckboxModule,
    DatePipe,
    KeyValuePipe,
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './assignments-list.component.html',
  styleUrl: './assignments-list.component.css'
})
export class AssignmentsListComponent implements OnChanges, OnInit {

  @Input() assignments: AssignmentProjection[] = [];


  date: Date = new Date();
  isSidebarOpen: boolean = true;

  // Property to store selected months
  selectedMonths: { label: string, value: string }[] = [];

  // Cached filtered and grouped assignments
  filteredAssignments: AssignmentProjection[] = [];
  groupedAssignments: { [key: string]: AssignmentProjection[] } = {};


  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFilteredAssignments();
    this.updateGroupedAssignments();
  }

  ngOnInit() {

    this.updateFilteredAssignments();
    this.updateGroupedAssignments();


  }

  get months(): { label: string, value: string }[] {
    const months = Array.from(new Set(this.assignments.map(assignment => {
      const date = assignment.dueDate;
      if (date == null) {
        return ""
      }
      return format(date, 'MMMM yyyy'); // Format the month and year
    })));

    return months.map(month => ({label: month, value: month}));
  }

  // Updates the filtered assignments based on selected months or current month
  updateFilteredAssignments() {
    const currentMonth = format(this.date, 'MMMM yyyy');
    const selectedMonthValues = this.selectedMonths.length > 0
      ? this.selectedMonths.map(month => month.value)
      : [currentMonth];

    this.filteredAssignments = this.assignments.filter(assignment => {
      const assignmentDate = assignment.dueDate;
      if (assignmentDate == null) {
        return false
      }

      const assignmentMonth = format(assignmentDate, 'MMMM yyyy');
      // Only show assignments with due dates that match the selected months and are not completed
      return selectedMonthValues.includes(assignmentMonth);
    });
  }

  // Updates the grouped assignments based on filtered assignments
  updateGroupedAssignments() {
    const grouped: { [key: string]: AssignmentProjection[] } = {};
    this.filteredAssignments.forEach(assignment => {
      const weekStart = assignment.dueDate;
      if (weekStart != undefined) {
        console.log(typeof weekStart)
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Get start of the week
        const weekKey = weekStart.toISOString().split('T')[0]; // Use this as key


        if (!grouped[weekKey]) {
          grouped[weekKey] = [];
        }
        grouped[weekKey].push(assignment);
      }

    });
    this.groupedAssignments = grouped;
  }

  // This method dynamically updates the header based on selected months
  get headerText(): string {
    if (this.selectedMonths.length === 0) {
      return `Assignments for ${format(this.date, 'MMMM yyyy')}`;
    } else if (this.selectedMonths.length === 1) {
      return `Assignments for ${this.selectedMonths[0].label}`;
    } else {
      return `Assignments for selected Months: ${this.formatMultipleSelectedMonths(this.selectedMonths)}`;
    }
  }

  formatMultipleSelectedMonths(selectedMonths: { label: string, value: string }[]): string {
    return selectedMonths.map(month => month.label).join(', ');
  }

  // Toggle the completion status of an assignment and update the lists
  toggleAssignmentCompletion(id: number) {
    /* this.assignments = this.assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );
    this.updateFilteredAssignments();
    this.updateGroupedAssignments();*/
  }

  // Select a new date and update the lists
  onDateSelect(newDate: Date) {
    if (newDate) {
      this.date = newDate;
      this.updateFilteredAssignments();
      this.updateGroupedAssignments();
    }
  }

  trackByAssignmentId(index: number, assignment: AssignmentProjection): number {
    return assignment.id || index;
  }

  // Update the lists when the month selection changes
  onMonthSelectionChange() {
    this.updateFilteredAssignments();
    this.updateGroupedAssignments();
  }
}
