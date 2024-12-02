import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserProjection} from "@core/model/User.model";
import {ClientService} from "@core/services/client/client.service";
import {ClientDataSourceService} from "@core/services/client-data-source.service";
import {GetPermissionsFromUserAsMap} from "@core/util/UserUtil";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {CurrentCourseContextService} from "@modules/courses/services/current-course-context.service";

@Component({
  selector: 'app-course-side-bar',
  templateUrl: './course-side-bar.component.html',
  styleUrl: './course-side-bar.component.css'
})
export class CourseSideBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  courseId!: number

  Client: UserProjection | null = null;

  hasAdminPageAccess: boolean = false;
  constructor(private clientService: ClientService,
              private clientDataSourceService: ClientDataSourceService,
              private route: ActivatedRoute,
              private router: Router,
              private currentCourseContextService: CurrentCourseContextService
  ) {}
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

    this.loadItems();
  }

  loadItems() {
    this.items = [
      {
        separator: true
      },

      {
        separator: true
      },

      {
        label: 'Back',
        icon: 'pi pi-arrow-left',
        command: () => {
          this.router.navigate(["dashboard"])
        }
      },

      {
        separator: true
      },

      {
        separator: true
      },



      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(["courses", this.courseId, "home"])
        }
      },

      {
        label: 'Assignments',
        icon: 'pi pi-file',
        command: () => {
          this.router.navigate(["courses", this.courseId, "assignments"])
        }
      },

      {
        label: 'Modules',
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate(["courses", this.courseId, "modules"])
        }
      },
      {
        label: 'Gradebook',
        icon: 'pi pi-book',
        visible: this.currentCourseContextService.isCourseTutor() || this.hasAdminPageAccess,
        command: () => {
          this.router.navigate(["courses", this.courseId, "gradebook"])
        }
      },
      {
        label: this.currentCourseContextService.isCourseTutor() || this.hasAdminPageAccess ? 'Student Gradebook' : 'Gradebook',
        icon: 'pi pi-book',
        command: () => {
          this.router.navigate(["courses", this.courseId, "studentGradebook"])
        }
      },
      {
        label: 'Performance',
        icon: 'pi pi-chart-bar',
        command: () => {
          this.router.navigate(["courses", this.courseId, "performance"])
        }
      },
      {
        separator: true
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        visible: this.currentCourseContextService.isCourseTutor() || this.hasAdminPageAccess,
        command: () => {
          this.router.navigate(["courses", this.courseId, "settings"])
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
