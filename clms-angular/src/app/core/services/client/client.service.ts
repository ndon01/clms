import {Injectable, OnInit, WritableSignal} from '@angular/core';
import {User} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";

export type INullish = undefined | null

export type IAppClient = {
  clientId: number | INullish,
}

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit {
  private user: User | null = null;
  private authenticated: boolean = false;
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    var localUser = localStorage.getItem('user');
    if (localUser) {
      this.user = JSON.parse(localUser);
    }
    if (this.user) {
      this.authenticated = true;
    } else {
      this.httpClient.get<User>('/api/user/me', {
        observe: 'body'
      }).subscribe((user: User) => {
        this.user = user;
        this.authenticated = true;
        localStorage.setItem('user', JSON.stringify(user));
      })
    }
  }

  public getUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }
}
