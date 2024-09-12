import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "@modules/admin/roles/role.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private http: HttpClient) { }

  getAllPermissionsResponse() {
    return this.http.get<Role[]>('/api/authorization/permissions', {
      observe: 'response'
    })
  }

  getAllRoles() {
    return this.getAllPermissionsResponse().pipe(map(response => response.body));
  }

}
