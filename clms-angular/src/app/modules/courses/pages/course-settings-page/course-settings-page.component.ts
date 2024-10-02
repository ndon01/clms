import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserProjection} from "@core/model/User.model";
import {filter, map} from "rxjs";

@Component({
  selector: 'courses-course-settings-page',
  templateUrl: './course-settings-page.component.html',
  styleUrl: './course-settings-page.component.css'
})
export class CourseSettingsPageComponent implements OnInit{

  courseId !: number;
  courseMembers: UserProjection[] = [];
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Get the value of 'id' parameter
      if (!id) {
        return;
      }
      this.courseId = parseInt(id, 10); // Convert the value to a number
    });

    this.httpClient.get<UserProjection[]>(`/api/courses/${this.courseId}/members`).subscribe(data =>
    {
      this.courseMembers = data;
    });


  }


  isAddMemberModalVisible: boolean = false;
  allUsers: UserProjection[] = [];
  selectedUsers: UserProjection[] = [];

  setMemberModalVisibility(visibility: boolean) {
    this.isAddMemberModalVisible = visibility;
    this.httpClient.get<UserProjection[]>('/api/admin/users')
      .pipe(map((users) => {
        return users
          .filter(user => !this.courseMembers.some(member => member.id === user.id))
      }))
      .subscribe(data => {
      this.allUsers = data;
    })
  }

  addMemberModalCancel() {
    this.isAddMemberModalVisible = false;
  }

  addMemberModalSubmit() {
    this.isAddMemberModalVisible = false;
    this.selectedUsers = [];
  }

}
