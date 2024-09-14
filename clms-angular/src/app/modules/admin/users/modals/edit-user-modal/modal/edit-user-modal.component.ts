import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {HttpClient} from "@angular/common/http";
import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'admin-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
})
export class EditUserModalComponent implements OnInit, OnChanges {
  user: User = {
    id: -1,
    username: "",
    roles: [],
    permissions: [],
    password: ""
  };

  allRoles: Role[] = [];
  allPermissions: Permission[] = [];

  roleSuggestions: string[] = [];
  permissionSuggestions: string[] = [];


  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig<User>, private http: HttpClient) {
    if (config.data !== undefined) {
      this.user = config.data;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["user"]) {
      this.config.data = this.user;
    }
  }

  ngOnInit(): void {
    this.http.get<Role[]>('/api/authorization/roles', {observe: 'body'}).subscribe(response => {
      this.allRoles = response;
    });

    this.http.get<Permission[]>('/api/authorization/permissions', {observe: 'body'}).subscribe(response => {
      this.allPermissions = response;
    });
  }

  searchForRoles(event: AutoCompleteCompleteEvent) {
    this.roleSuggestions = this.allRoles
      .filter(role => role.name.toLowerCase().includes(event.query.toLowerCase()))
      .filter(role => !this.user.roles.includes(role))
      .map(role => role.name);
  }

  searchForPermissions(event: AutoCompleteCompleteEvent) {
    this.permissionSuggestions = this.allPermissions
      .filter(permission => permission.name.toLowerCase().includes(event.query.toLowerCase()))
      .filter(permission => !this.user.permissions.includes(permission))
      .map(permission => permission.name);
  }

}
