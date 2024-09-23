import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserProjection} from "@core/model/User.model";



interface DatasourceService<T> {
  get(): BehaviorSubject<T>
  refresh(): void
}

@Injectable({
  providedIn: 'root'
})
export class ClientDataSourceService {
  private source: BehaviorSubject<UserProjection | null> = new BehaviorSubject<UserProjection | null>(null);

  constructor(private httpClient: HttpClient) {
    this.refresh();
  }

  get() {
    return this.source.asObservable();
  }

  refresh() {
    this.httpClient.get<UserProjection>('/api/v1/users/me', {
      observe: 'response',
    }).subscribe(data =>{
      if (data.status === 200) {
        this.source.next(data.body || null);
      }
    })
  }


}
