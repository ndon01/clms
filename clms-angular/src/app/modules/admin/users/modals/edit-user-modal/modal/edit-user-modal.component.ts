import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {HttpClient} from "@angular/common/http";
import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";

@Component({
  selector: 'admin-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
})
export class EditUserModalComponent implements OnInit {
  user: User = {
    id: -1,
    username: "",
    roles: [],
    permissions: [],
    password: ""
  };

  allRoles: Role[] = [];
  allPermissions: Permission[] = [];
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig<User>, private http: HttpClient) {
    if (config.data !== undefined) {
      this.user = config.data;
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

}
