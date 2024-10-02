import { Component } from '@angular/core';
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
export class IndividualCourseHomepageComponent {
  date: Date = new Date();
  isSidebarOpen: boolean = true;
  assignments: Assignment[] = [
    { id: 1, title: "Practice Test 1", dueDate: "2024-09-15", completed: false },
    { id: 2, title: "Vocabulary Quiz", dueDate: "2024-09-17", completed: false },
    { id: 3, title: "Math Drills", dueDate: "2024-09-20", completed: false },
    { id: 4, title: "Essay Writing", dueDate: "2024-09-22", completed: false },
    { id: 5, title: "Reading Comprehension", dueDate: "2024-09-25", completed: false },
    { id: 6, title: "Grammar Review", dueDate: "2024-09-02", completed: false },
    { id: 7, title: "Practice Test 2", dueDate: "2024-10-05", completed: false },
    { id: 8, title: "Algebra Workshop", dueDate: "2024-10-10", completed: false },
  ];

  // New property to store selected months (as objects with label and value)
  selectedMonths: { label: string, value: string }[] = [];

  // Create a list of unique months from assignments' due dates
  get months(): { label: string, value: string }[] {
    const months = Array.from(new Set(this.assignments.map(assignment => {
      const date = new Date(assignment.dueDate);
      return format(date, 'MMMM yyyy'); // Format the month and year
    })));

    return months.map(month => ({ label: month, value: month }));
  }

  private filteredAssignmentsCache: Assignment[] | null = null;
  private lastDateChange: Date | null = null;
  private lastAssignmentsChange: number | null = null;
  private groupedAssignmentsCache: { [key: string]: Assignment[] } | null = null;
  // Modified filteredAssignments getter to filter by the month of the due date
  get filteredAssignments(): Assignment[] {
    if (
      !this.filteredAssignmentsCache ||
      this.lastDateChange !== this.date ||
      this.lastAssignmentsChange !== this.assignments.length
    ) {
      const currentMonth = format(this.date, 'MMMM yyyy');

      // Get the selected month values (for filtering)
      const selectedMonthValues = this.selectedMonths.length > 0 ? this.selectedMonths.map(month => month.value) : [currentMonth];

      this.filteredAssignmentsCache = this.assignments.filter(assignment => {
        const assignmentDate = new Date(assignment.dueDate);
        const assignmentMonth = format(assignmentDate, 'MMMM yyyy');

        // Only show assignments with due dates that match the selected months and are not completed
        return !assignment.completed && selectedMonthValues.includes(assignmentMonth);
      });

      this.lastDateChange = this.date;
      this.lastAssignmentsChange = this.assignments.length;
    }
    return this.filteredAssignmentsCache;
  }
  get groupedAssignments(): { [key: string]: Assignment[] } {
    if (!this.groupedAssignmentsCache || this.lastDateChange !== this.date || this.lastAssignmentsChange !== this.assignments.length) {
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
      this.groupedAssignmentsCache = grouped;
    }
    return this.groupedAssignmentsCache;
  }


  // This method will dynamically update the header based on selected months
  get headerText(): string {
    if (this.selectedMonths.length === 0) {
      return `Assignments for ${format(this.date, 'MMMM yyyy')}`;
    } else if (this.selectedMonths.length === 1) {
      console.log(this.selectedMonths[0])
      return `Assignments for ${this.selectedMonths[0].value}`;  // Use label here
    } else {
      return `Assignments for Selected Months`;
    }
  }

  toggleAssignmentCompletion(id: number) {
    this.assignments = this.assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );
    this.filteredAssignmentsCache = null; // Invalidate cache
  }


  onDateSelect(newDate: Date) {
    if (newDate) {
      this.date = newDate;
      this.filteredAssignmentsCache = null; // Invalidate cache
    }
  }

  trackByAssignmentId(index: number, assignment: Assignment): number {
    return assignment.id;
  }

  // Update filtered assignments when the month selection changes
  onMonthSelectionChange() {
    this.filteredAssignmentsCache = null; // Invalidate cache
  }
}
