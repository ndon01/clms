import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    return this.http.post<HttpResponse<any>>("/api/v1/authentication/login", {
      username: username,
      password: password
    }, {
      observe: 'response'
    })
  }
}
