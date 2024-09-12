import {Component, OnInit} from '@angular/core';
import {ClientService} from "@core/services/client/client.service";
import {User} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  client: User | null = null
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get<User>("/api/v1/users/me").subscribe(value => {
      this.client = value
    })
  }

}
