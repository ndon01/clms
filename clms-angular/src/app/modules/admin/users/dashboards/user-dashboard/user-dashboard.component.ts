import {Component, OnInit} from '@angular/core';
import {User, UserProjection} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";
import {TableEditCompleteEvent, TablePageEvent} from "primeng/table";
import {MenuItem} from "primeng/api";
import {
  CreateUserModalLauncherService
} from "@modules/admin/users/modals/create-user-modal/launcher/create-user-modal-launcher.service";
import {Permission} from "@modules/admin/permissions/permission.model";
import {PermissionsDataSourceService} from "@modules/admin/authorization/service/permissions-data-source.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";
import {RolesDataSourceService} from "@modules/admin/authorization/service/roles-data-source.service";

@Component({
  selector: 'admin-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  users: UserProjection[] = [];
  permissionsList: PermissionProjection[] = [];
  rolesList: RoleProjection[] = [];

  items!: MenuItem[];

  isUserCreationModalVisible: boolean = false;


  constructor(private httpClient: HttpClient, private createUserModalLauncherService: CreateUserModalLauncherService,
              private permissionsDataSourceService: PermissionsDataSourceService, private rolesDataSourceService: RolesDataSourceService) {
    this.permissionsDataSourceService.get().pipe(takeUntilDestroyed()).subscribe(permissions => {
      this.permissionsList = permissions;
    });

    this.rolesDataSourceService.get().pipe(takeUntilDestroyed()).subscribe(roles => {
      this.rolesList = roles;
    });

  }

  ngOnInit() {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.isUserCreationModalVisible = true;
        }
      }
    ]

    this.httpClient.get<UserProjection[]>('/api/admin/users').subscribe(users => {
      this.users = users;
    });

  }

  onUserRowEditInit(user: User) {
    console.log(user)
  }

  onUserRowEditSave(user: User) {
    console.log(user)
    this.httpClient.post('/api/admin/users/updateUser/' + user.id, user).subscribe(() => {
      console.log('User updated')
    })
  }

  onUserRowEditCancel(user: User, index: number) {
    console.log(user, index)
  }

  onRoleRowEditInit(role: RoleProjection) {
    console.log(role)
  }

  onRoleRowEditSave(role: RoleProjection) {
    console.log(role)
    this.httpClient.post('/api/admin/authorization/roles/updateRole/' + role.id, role).subscribe(() => {
      console.log('Role updated')
    })
  }

  onRoleRowEditCancel(role: RoleProjection, index: number) {
    console.log(role, index)
  }

}
