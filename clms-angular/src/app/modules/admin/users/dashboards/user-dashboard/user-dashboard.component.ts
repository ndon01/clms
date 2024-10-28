import {Component, OnInit} from '@angular/core';
import {User, UserProjection} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";
import {TableEditCompleteEvent, TablePageEvent} from "primeng/table";
import {MenuItem, MessageService} from "primeng/api";
import {
  CreateUserModalLauncherService
} from "@modules/admin/users/modals/create-user-modal/launcher/create-user-modal-launcher.service";
import {Permission} from "@modules/admin/permissions/permission.model";
import {PermissionsDataSourceService} from "@modules/admin/authorization/service/permissions-data-source.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";
import {RolesDataSourceService} from "@modules/admin/authorization/service/roles-data-source.service";
import {PaginatorState} from "primeng/paginator";

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
  roleMenuItems!: MenuItem[];

  isUserCreationModalVisible: boolean = false;

  isNewRoleCreationRowVisible: boolean = false;
  newRole: RoleProjection = {
    id: 0,
    name: '',
    description: '',
    permissions: []
  }

  isNewUserCreationRowVisible: boolean = false;
  newUser: UserProjection = {
    id: 0,
    username: '',
    password: '',
    roles: [],
    permissions: []
  }

  onNewUserEditCancel() {
    this.isNewUserCreationRowVisible = false;
    this.cleanupNewUserValue();
  }

  onNewUserEditCreate() {
    this.isNewUserCreationRowVisible = false;
    this.createNewUser(this.newUser);
    this.cleanupNewUserValue();
  }

  createNewUser(user: UserProjection) {
    this.httpClient.post('/api/admin/users/createUser', {
      username: user.username,
      password: user.password
    }, {
      observe: 'response'
    }).subscribe((res) => {
      if (res.status === 201) {
        this.fetchUsers();
        this.messagesService.add({severity: 'success', summary: 'User created', detail: 'User created successfully'});
      }
    })
  }

  cleanupNewUserValue() {
    this.newUser = {
      id: 0,
      username: '',
      password: '',
      roles: [],
      permissions: []
    }
  }



  constructor(private httpClient: HttpClient, private createUserModalLauncherService: CreateUserModalLauncherService,
              private permissionsDataSourceService: PermissionsDataSourceService, private rolesDataSourceService: RolesDataSourceService,
              private messagesService: MessageService) {
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
          this.isNewUserCreationRowVisible = true;
        }
      }
    ]

    this.roleMenuItems = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.isNewRoleCreationRowVisible = true;
        }
      }
    ]

    this.fetchUsers();

  }

  fetchUsers() {
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
      this.messagesService.add({severity: 'success', summary: 'User updated', detail: 'User updated successfully'});
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
      this.messagesService.add({severity: 'success', summary: 'Role updated', detail: 'Role updated successfully'});
    })
  }

  onRoleRowEditCancel(role: RoleProjection, index: number) {
    console.log(role, index)
  }

  onNewRoleEditCancel() {
    this.isNewRoleCreationRowVisible = false;
    this.cleanupNewRoleValue();
  }

  onNewRoleEditCreate() {
    this.isNewRoleCreationRowVisible = false;
    this.createNewRole(this.newRole);
    this.cleanupNewRoleValue();
  }

  createNewRole(role: RoleProjection) {
    this.httpClient.post('/api/admin/authorization/roles/createRole', role, {
      observe: 'response'
    }).subscribe((res) => {
      this.rolesDataSourceService.refresh();
      if (res.status === 201) {
        this.messagesService.add({severity: 'success', summary: 'Role created', detail: 'Role created successfully'});
      }
    })
  }

  cleanupNewRoleValue() {
    this.newRole = {
      id: 0,
      name: '',
      description: '',
      permissions: []
    }
  }

  onUserPageChange(event: TablePageEvent) {
    console.log(event)
    this.httpClient.get<UserProjection[]>('/api/admin/users', {
      params: {
        page: event.first,
        size: event.rows
      }
    }).subscribe(users => {
      this.users = users;
    });
  }

}
