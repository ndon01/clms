import { Component } from '@angular/core';

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  date: Date = new Date();
  isSidebarOpen: boolean = true;
  assignments: Assignment[] = [
    { id: 1, title: 'Practice Test 1', dueDate: '2024-09-15', completed: false },
    { id: 2, title: 'Vocabulary Quiz', dueDate: '2024-09-17', completed: false },
    { id: 3, title: 'Math Drills', dueDate: '2024-09-20', completed: false },
    { id: 4, title: 'Essay Writing', dueDate: '2024-09-22', completed: false },
    { id: 5, title: 'Reading Comprehension', dueDate: '2024-09-25', completed: false },
    { id: 6, title: 'Grammar Review', dueDate: '2024-09-02', completed: false },
    { id: 7, title: 'Practice Test 2', dueDate: '2024-10-05', completed: false },
    { id: 8, title: 'Algebra Workshop', dueDate: '2024-10-10', completed: false }
  ];

  toggleAssignmentCompletion(id: number) {
    this.assignments = this.assignments.map(assignment =>
      assignment.id === id
        ? { ...assignment, completed: !assignment.completed }
        : assignment
    );
  }

  get filteredAssignments(): Assignment[] {
    return this.assignments.filter(assignment => {
      const assignmentDate = new Date(assignment.dueDate);
      return (
        assignmentDate.getMonth() === this.date.getMonth() &&
        assignmentDate.getFullYear() === this.date.getFullYear() &&
        !assignment.completed
      );
    });
  }

  get groupedAssignments(): { [key: string]: Assignment[] } {
    const grouped: { [key: string]: Assignment[] } = {};
    this.filteredAssignments.forEach(assignment => {
      const weekStart = new Date(assignment.dueDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(assignment);
    });
    return grouped;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onDateSelect(newDate: Date) {
    if (newDate) {
      this.date = newDate;
    }
  }

}
