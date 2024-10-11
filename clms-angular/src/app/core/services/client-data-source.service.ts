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
    let save = localStorage.getItem('client_data')
    if (save) {
      this.source.next(JSON.parse(save));
    }
    this.refresh();
  }

  get() {
    return this.source.asObservable();
  }

  refresh() {
    this.httpClient.get<UserProjection>('/api/v1/users/client', {
      observe: 'response',
    }).subscribe(data =>{
      if (data.status === 200) {
        localStorage.setItem('client_data', JSON.stringify(data.body));
        this.source.next(data.body || null);
      }
    })
  }


}
