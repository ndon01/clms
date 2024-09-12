import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {User} from "@core/model/User.model";
import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'admin-user-form-component',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() user: User = {
    id: -1,
    username: "",
    roles: [],
    permissions: [],
    password: ""
  };
  @Output() userChange: EventEmitter<User> = new EventEmitter<User>();

  @Input() roles: Role[] = [];
  @Input() permissions: Permission[] = [];

  userRoles: string[] = [];
  roleSuggestions: string[] = [];

  userPermissions: string[] = [];
  permissionSuggestions: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.userRoles = this.user.roles.map(role => role.name);
    this.userPermissions = this.user.permissions.map(permission => permission.name);
  }

  onUsernameChange(event: Event) {
    var target = event.target as HTMLInputElement;
    var username = target.value;
    this.user = {
      ...this.user,
      username: username
    } as User;
    this.userChange.emit(this.user);
  }

  searchForRoles(event: AutoCompleteCompleteEvent) {
    this.roleSuggestions = this.roles
      .filter(role => role.name.toLowerCase().includes(event.query.toLowerCase()))
      .filter(role => !this.userRoles.includes(role.name))
      .map(role => role.name);
  }

  searchForPermissions(event: AutoCompleteCompleteEvent) {
    this.permissionSuggestions = this.permissions
      .filter(permission => permission.name.toLowerCase().includes(event.query.toLowerCase()))
      .filter(permission => !this.userPermissions.includes(permission.name))
      .map(permission => permission.name);
  }
}
