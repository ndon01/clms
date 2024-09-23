import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tabs = [
    { label: 'Users', value: 'users' },
    { label: 'Question Bank', value: 'questionBank' }
  ];

  selectedTab = this.tabs[0]; // Default selection

  onTabChange(event: any) {
    console.log('Selected Tab: ', event.value);
  }
}
