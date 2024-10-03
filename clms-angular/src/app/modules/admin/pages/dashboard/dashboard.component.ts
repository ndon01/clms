import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Route, Router} from "@angular/router";
import {Location} from "@angular/common";
import {filter} from "rxjs";
import {MenuItem} from "primeng/api";
import {ClientService} from "@core/services/client/client.service";
import {UserProjection} from "@core/model/User.model";
import {GetPermissionsFromUserAsMap} from "@core/util/UserUtil";
import {ClientDataSourceService} from "@core/services/client-data-source.service";

@Component({
  selector: 'admin-dashboard-export',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] | undefined;
  Client: UserProjection | null = null;

  constructor(public router: Router, private clientService: ClientService, private clientDataSourceService: ClientDataSourceService) {
  }

  ngOnInit() {
    this.clientDataSourceService.get().subscribe(newUser => {
      this.Client = newUser
    })

    this.loadItems();
  }
  loadItems() {
    this.items = [
      {
        separator: true
      },

      {
        separator: true
      },

      {
        label: 'Back',
        icon: 'pi pi-arrow-left',
        command: () => {
          this.router.navigate(["dashboard"])
        }
      },

      {
        separator: true
      },

      {
        separator: true
      },


      {
        label: 'Users',
        icon: 'pi pi-users',
        command: () => {
          this.router.navigate(["admin", "users"])
        }
      },

      {
        label: 'Question Bank',
        icon: 'pi pi-question-circle',
        command: () => {
          this.router.navigate(["admin", "question-bank"])
        }
      },

      {
        label: 'Courses',
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate(["admin", "courses"])
        }
      },



    ];
  }


  logout() {
    this.clientService.logout();
  }

  usernameToInitials(username: string) {
    if (username.length === 0 || username === null) {
      return ""
    }

    const initials = username.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

}
