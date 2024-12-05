import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) { }

  register(username: String, password: String) {
    return this.http.post<any>("/api/v1/authentication/register", {
      username: username,
      password: password
    }, {
      observe: 'response'
    })
  }
}
