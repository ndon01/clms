import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Route, Router} from "@angular/router";
import {Location} from "@angular/common";
import {filter} from "rxjs";

@Component({
  selector: 'admin-dashboard-export',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tabs = [
    { label: 'Users', value: 'users' },
    { label: 'Question Bank', value: 'question-bank' },
    { label: 'Courses', value: 'courses' }
  ];

  selectedTab = this.tabs[0]; // Default selection

  onTabChange(event: any) {
    console.log('Selected Tab: ', event.value);
    this.router.navigate(['/admin/' + this.selectedTab.value])

  }

  constructor(public router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const url = this.router.url;
      const tabName = url.split('/').pop();
      this.selectedTab = this.tabs.find((tab) => tab.value === tabName) || this.tabs[0];
    })
  }


}
