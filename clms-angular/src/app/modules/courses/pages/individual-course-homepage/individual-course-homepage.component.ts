import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

@Component({
  selector: 'app-individual-course-component',
  templateUrl: './individual-course-homepage.component.html',
  styleUrls: ['./individual-course-homepage.component.css']
})
export class IndividualCourseHomepageComponent implements OnInit {
  date: Date = new Date();
  isSidebarOpen: boolean = true;
  assignments: Assignment[] = [
    { id: 1, title: "Practice Test 1", dueDate: "2024-10-15", completed: false },
    { id: 2, title: "Vocabulary Quiz", dueDate: "2024-10-17", completed: false },
    { id: 3, title: "Math Drills", dueDate: "2024-09-20", completed: false },
    { id: 4, title: "Essay Writing", dueDate: "2024-10-22", completed: false },
    { id: 5, title: "Reading Comprehension", dueDate: "2024-09-25", completed: false },
    { id: 6, title: "Grammar Review", dueDate: "2024-09-02", completed: false },
    { id: 7, title: "Practice Test 2", dueDate: "2024-10-05", completed: false },
    { id: 8, title: "Algebra Workshop", dueDate: "2024-10-10", completed: false },
  ];

  // Property to store selected months
  selectedMonths: { label: string, value: string }[] = [];

  // Cached filtered and grouped assignments
  filteredAssignments: Assignment[] = [];
  groupedAssignments: { [key: string]: Assignment[] } = {};

  ngOnInit() {
    this.updateFilteredAssignments();
    this.updateGroupedAssignments();
  }

  // Create a list of unique months from assignments' due dates
  get months(): { label: string, value: string }[] {
    const months = Array.from(new Set(this.assignments.map(assignment => {
      const date = new Date(assignment.dueDate);
      return format(date, 'MMMM yyyy'); // Format the month and year
    })));

    return months.map(month => ({ label: month, value: month }));
  }

  // Updates the filtered assignments based on selected months or current month
  updateFilteredAssignments() {
    const currentMonth = format(this.date, 'MMMM yyyy');
    const selectedMonthValues = this.selectedMonths.length > 0
      ? this.selectedMonths.map(month => month.value)
      : [currentMonth];

    this.filteredAssignments = this.assignments.filter(assignment => {
      const assignmentDate = new Date(assignment.dueDate);
      const assignmentMonth = format(assignmentDate, 'MMMM yyyy');

      // Only show assignments with due dates that match the selected months and are not completed
      return !assignment.completed && selectedMonthValues.includes(assignmentMonth);
    });
  }

  // Updates the grouped assignments based on filtered assignments
  updateGroupedAssignments() {
    const grouped: { [key: string]: Assignment[] } = {};
    this.filteredAssignments.forEach(assignment => {
      const weekStart = new Date(assignment.dueDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Get start of the week
      const weekKey = weekStart.toISOString().split('T')[0]; // Use this as key

      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(assignment);
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
    this.assignments = this.assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );
    this.updateFilteredAssignments();
    this.updateGroupedAssignments();
  }

  // Select a new date and update the lists
  onDateSelect(newDate: Date) {
    if (newDate) {
      this.date = newDate;
      this.updateFilteredAssignments();
      this.updateGroupedAssignments();
    }
  }

  trackByAssignmentId(index: number, assignment: Assignment): number {
    return assignment.id;
  }

  // Update the lists when the month selection changes
  onMonthSelectionChange() {
    this.updateFilteredAssignments();
    this.updateGroupedAssignments();
  }
}
