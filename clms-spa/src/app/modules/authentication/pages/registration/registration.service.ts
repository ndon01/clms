import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(emailAddress: String, password: String) {
    return this.http.post<HttpResponse<any>>("/api/v1/authentication/register", {
      emailAddress: emailAddress,
      password: password
    }, {
      observe: 'response'
    })
  }
}
