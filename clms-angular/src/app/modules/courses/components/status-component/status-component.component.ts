import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-status',
  templateUrl: 'status-component.component.html',
  styleUrls: ['./status-component.component.css']
})
export class StatusComponent  {
  @Input() status: string | undefined;

  constructor() {}
  getBackgroundColor(): string {
    switch (this.status) {
      case 'COMPLETED':
        return '#4ade80'; // Green for Completed
      case 'Submitted':
        return '#4ade80'; // Green for Submitted
      case 'IN_PROGRESS':
        return '#38BDF8'; // Yellow for In Progress
      case 'Not attempted':
        return "#F87171"
      default:
        return '#F87171'; // Gray for Not Submitted
    }
  }
}
