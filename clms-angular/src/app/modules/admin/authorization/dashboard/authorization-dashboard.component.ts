import {Component, OnInit} from '@angular/core';
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";
import {RolesDataSourceService} from "@modules/admin/authorization/service/roles-data-source.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'admin-authorization-dashboard',
  templateUrl: './authorization-dashboard.component.html',
  styleUrl: './authorization-dashboard.component.css'
})
export class AuthorizationDashboardComponent implements OnInit{
  allRoles!: RoleProjection[];
  selectedRole!: RoleProjection;

  constructor(public rolesDataSourceService: RolesDataSourceService) {
    this.rolesDataSourceService.get()
      .pipe(takeUntilDestroyed())
      .subscribe(roles => {
        this.allRoles = roles;
      })
  }

  ngOnInit() {
  }


  onRoleSelected(role: RoleProjection) {
    this.selectedRole = role;
  }
}

