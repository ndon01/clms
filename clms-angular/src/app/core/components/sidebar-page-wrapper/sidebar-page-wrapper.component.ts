import {Component, OnChanges, OnInit} from '@angular/core';
import {ListboxModule} from "primeng/listbox";
import {MenuItem} from "primeng/api";
import {PanelMenuModule} from "primeng/panelmenu";
import {BadgeModule} from "primeng/badge";
import {ClientService} from "@core/services/client/client.service";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {UserProjection} from "@core/model/User.model";
import {NgIf} from "@angular/common";
import {GetPermissionsFromUserAsMap} from "@core/util/UserUtil";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-page-wrapper',
  templateUrl: './sidebar-page-wrapper.component.html',
  styleUrl: './sidebar-page-wrapper.component.css'
})
export class SidebarPageWrapperComponent implements OnInit, OnChanges {
  items: MenuItem[] | undefined;
  Client: UserProjection | null = null;

  hasAdminPageAccess: boolean = false;
  constructor(private clientService: ClientService, private clientDataSourceService: ClientDataSourceService, private router: Router) {}
  ngOnInit() {
    this.clientDataSourceService.get().subscribe(newUser => {
      this.Client = newUser
      this.hasAdminPageAccess = GetPermissionsFromUserAsMap(this.Client as UserProjection).has("ADMIN_PAGE_ACCESS")
    })

    this.loadItems();
  }

  loadItems() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(["dashboard"])
        }
      },

      {
        label: 'Courses',
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate(["courses"])
        }
      },

      {
        label: 'Administration',
        icon: 'pi pi-cog',
        visible: this.hasAdminPageAccess,
        command: () => {
          this.router.navigate(["admin"])
        }
      }

    ];
  }


  ngOnChanges() {
    this.hasAdminPageAccess = this.clientService.hasPermission("ADMIN_PAGE_ACCESS")
  }

  logout() {
    this.clientService.logout();
  }

  usernameToInitials(username: string) {
    if (username.length === 0 || username === null) {
      return ""
    }

    const initials = username.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
}
