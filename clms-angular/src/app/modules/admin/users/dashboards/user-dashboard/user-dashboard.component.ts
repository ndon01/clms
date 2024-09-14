import {Component, NO_ERRORS_SCHEMA, OnChanges, OnInit} from '@angular/core';
import {User} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'admin-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  users!: User[];


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('/api/admin/users', {observe: 'body'})
      .subscribe(response => this.users = response);
  }

}
