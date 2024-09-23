import {Component, OnChanges, OnInit} from '@angular/core';
import {ListboxModule} from "primeng/listbox";
import {MenuItem} from "primeng/api";
import {PanelMenuModule} from "primeng/panelmenu";
import {BadgeModule} from "primeng/badge";
import {ClientService} from "@core/services/client/client.service";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {UserProjection} from "@core/model/User.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar-page-wrapper',
  standalone: true,
  imports: [
    ListboxModule,
    PanelMenuModule,
    BadgeModule,
    NgIf
  ],
  templateUrl: './sidebar-page-wrapper.component.html',
  styleUrl: './sidebar-page-wrapper.component.css'
})
export class SidebarPageWrapperComponent implements OnInit, OnChanges {
  Client: UserProjection | null = null;

  hasAdminPageAccess: boolean = false;
  constructor(private clientService: ClientService, private clientDataSourceService: ClientDataSourceService) {
    this.clientDataSourceService.get().subscribe(newUser => this.Client = newUser)
  }
  ngOnInit() {
    this.hasAdminPageAccess = this.clientService.hasPermission("ADMIN_PAGE_ACCESS")
  }

  ngOnChanges() {
    this.hasAdminPageAccess = this.clientService.hasPermission("ADMIN_PAGE_ACCESS")
  }
}
