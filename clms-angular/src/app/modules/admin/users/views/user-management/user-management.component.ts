import {Component, forwardRef, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@core/model/User.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {UsersTableComponent} from "@modules/admin/users/components/users-table/users-table.component";
import {
  EditUserModalLauncherService
} from "@modules/admin/users/modals/edit-user-modal/launcher/edit-user-modal-launcher.service";
import {
  CreateUserModalLauncherService
} from "@modules/admin/users/modals/create-user-modal/launcher/create-user-modal-launcher.service";

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

  constructor(private http: HttpClient, private editUserModalLauncher: EditUserModalLauncherService, private createUserModalLauncher: CreateUserModalLauncherService) {
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
    this.createUserModalLauncher.launch()
  }

  startEditUserWorkflow(user: User) {
    this.editUserModalLauncher.launch(user)
  }
}
