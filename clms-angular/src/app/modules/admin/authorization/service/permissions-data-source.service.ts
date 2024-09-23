import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";

@Injectable({
  providedIn: 'root'
})
export class PermissionsDataSourceService {
  private source: BehaviorSubject<PermissionProjection[]> = new BehaviorSubject<PermissionProjection[]>([]);

  constructor(private httpClient: HttpClient) {
    this.refresh();
  }

  get() {
    return this.source.asObservable();
  }

  refresh() {
    this.httpClient.get<PermissionProjection[]>('/api/authorization/permissions', {
      observe: 'response'
    }).subscribe(data =>{
      if (data.status === 200) {
        this.source.next(data.body || []);
      }
    })
  }
}

