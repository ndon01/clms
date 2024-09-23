import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";

@Injectable({
  providedIn: 'root'
})
export class RolesDataSourceService {
  private source: BehaviorSubject<RoleProjection[]> = new BehaviorSubject<RoleProjection[]>([]);


  constructor(private httpClient: HttpClient) {
    this.refresh();
  }

  get() {
    return this.source.asObservable();
  }

  refresh() {
    this.httpClient.get<RoleProjection[]>('/api/authorization/roles', {
      observe: 'response'
    }).subscribe(data =>{
      if (data.status === 200) {
        this.source.next(data.body || []);
      }
    })
  }
}
