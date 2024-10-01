import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {MenubarModule} from "primeng/menubar";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MenuItem, MessageService, PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {User, UserProjection} from "@core/model/User.model";
import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";
import {HttpClient} from "@angular/common/http";
import {
  CreateUserModalLauncherService
} from "@modules/admin/users/modals/create-user-modal/launcher/create-user-modal-launcher.service";
import {PermissionsDataSourceService} from "@modules/admin/authorization/service/permissions-data-source.service";
import {RolesDataSourceService} from "@modules/admin/authorization/service/roles-data-source.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Course, CourseProjection} from "@modules/courses/model/course.model";

@Component({
  selector: 'admin-courses-dashboard',
  templateUrl: './courses-dashboard.component.html',
  styleUrl: './courses-dashboard.component.css'
})
export class CoursesDashboardComponent {
  courses: CourseProjection[] = [];

  items!: MenuItem[];

  isNewCourseModalVisible: boolean = false;
  newCourse: CourseProjection = {
    id: 0,
    name: '',
    description: ''
  }

  onNewCourseEditCancel() {
    this.isNewCourseModalVisible = false;
    this.cleanupNewCourseValue();
  }

  onNewCourseEditCreate() {
    this.isNewCourseModalVisible = false;
    this.createCourse(this.newCourse);
    this.cleanupNewCourseValue();
  }

  createCourse(course: CourseProjection) {
    this.httpClient.post('/api/courses', {
      courseName:  course.name,
      description: course.description
    }, {
      observe: 'response'
    }).subscribe((res) => {
      if (res.status === 201) {
        this.fetchCourses();
        this.messagesService.add({severity: 'success', summary: 'Course created', detail: 'Course created successfully'});
      }
    })
  }

  cleanupNewCourseValue() {
    this.newCourse = {
      id: 0,
      name: '',
      description: ''
    }
  }



  constructor(private httpClient: HttpClient, private createUserModalLauncherService: CreateUserModalLauncherService,
              private permissionsDataSourceService: PermissionsDataSourceService, private rolesDataSourceService: RolesDataSourceService,
              private messagesService: MessageService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          this.isNewCourseModalVisible = true;
        }
      }
    ]

    this.fetchCourses();

  }

  fetchCourses() {
    this.httpClient.get<CourseProjection[]>('/api/courses').subscribe(courses => {
      this.courses = courses;
    });
  }

  onUserRowEditInit(user: CourseProjection) {
    console.log(user)
  }

  onUserRowEditSave(user: CourseProjection) {
    console.log(user)
    this.httpClient.put('/api/courses/' + user.id, user).subscribe(() => {
      console.log('User updated')
      this.messagesService.add({severity: 'success', summary: 'User updated', detail: 'User updated successfully'});
    })
  }

  onUserRowEditCancel(user: CourseProjection, index: number) {
    console.log(user, index)
  }


}
