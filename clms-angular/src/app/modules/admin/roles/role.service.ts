import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Role} from "@modules/admin/roles/role.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAllRolesResponse() {
    return this.http.get<Role[]>('/api/authorization/roles', {
      observe: 'response'
    })
  }

  getAllRoles() {
    return this.getAllRolesResponse().pipe(map(response => response.body));
  }


}
