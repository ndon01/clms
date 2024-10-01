import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserProjection} from "@core/model/User.model";
import {ClientService} from "@core/services/client/client.service";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {GetPermissionsFromUserAsMap} from "@core/util/UserUtil";

@Component({
  selector: 'app-course-side-bar',
  templateUrl: './course-side-bar.component.html',
  styleUrl: './course-side-bar.component.css'
})
export class CourseSideBarComponent implements OnInit {
  courseId!: number

  Client: UserProjection | null = null;

  hasAdminPageAccess: boolean = false;
  constructor(private clientService: ClientService, private clientDataSourceService: ClientDataSourceService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.clientDataSourceService.get().subscribe(newUser => {
      this.Client = newUser
      this.hasAdminPageAccess = GetPermissionsFromUserAsMap(this.Client as UserProjection).has("ADMIN_PAGE_ACCESS")
    })

    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Get the value of 'id' parameter
      if (!id) {
        return;
      }
      this.courseId = parseInt(id, 10); // Convert the value to a number
    });
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
