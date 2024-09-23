import {Component, OnInit} from '@angular/core';
import {ClientService} from "@core/services/client/client.service";
import {User, UserProjection} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";
import {SidebarPageWrapperComponent} from "@core/components/sidebar-page-wrapper/sidebar-page-wrapper.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    SidebarPageWrapperComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  client: UserProjection | null = null
  constructor(private clientService: ClientService) {
    this.client = clientService.getUser()
  }

  ngOnInit() {
  }

}
