import {Component, Input, OnInit} from '@angular/core';
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";
import {PermissionsDataSourceService} from "@modules/admin/authorization/service/permissions-data-source.service";
import {HttpClient} from "@angular/common/http";
import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'admin-authorization-role-permissions-view',
  templateUrl: './role-permissions-view.component.html',
  styleUrl: './role-permissions-view.component.css'
})
export class RolePermissionsViewComponent implements OnInit {
  @Input() role!: RoleProjection;
  @Input() allPermissions!: PermissionProjection[];

  permissionOptions = [
    { name: 'Disabled', value: 0 },
    { name: 'No Preference', value: 2 },
    { name: 'Enabled', value: 1 }
  ]

  constructor(private permissionsDataSourceService: PermissionsDataSourceService, private httpClient: HttpClient) {
    this.permissionsDataSourceService.get()
      .pipe(takeUntilDestroyed())
      .subscribe(permissions => {
        this.allPermissions = permissions;
      })
  }

  ngOnInit(): void {
    this.loadRoleData();
  }

  loadRoleData() {
    if (!this.role) {
      return;
    }

    this.httpClient.get<PermissionProjection[]>(`/api/authorization/roles/${this.role.id}/permissions`, {
      observe: 'response'
    }).subscribe(data =>{
      if (data.status === 200) {

      }
    })
  }
}
