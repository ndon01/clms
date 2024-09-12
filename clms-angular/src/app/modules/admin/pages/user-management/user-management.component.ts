import {Component, forwardRef, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@core/model/User.model";
import {NgForOf} from "@angular/common";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {UsersTableComponent} from "@modules/admin/users/users-table/users-table.component";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsersTableComponent),  // replace name as appropriate
      multi: true
    }
  ],
})
export class UserManagementComponent implements OnInit, OnChanges {

  users: User[] = [];
  selectedUsers: User[] = [];
  addUserDialogVisible: boolean = false;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<User[]>('/api/admin/users', {observe: 'body'})
      .subscribe(response => this.users = response);
  }

  ngOnChanges() {
    console.log(this.selectedUsers);
    console.log(this.users);
  }

  startCreateUserWorkflow() {
    this.addUserDialogVisible = true;
  }
}
