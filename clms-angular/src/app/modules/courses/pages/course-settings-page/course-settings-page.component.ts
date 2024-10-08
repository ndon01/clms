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

    this.loadMembers();


  }

  loadMembers() {
    this.httpClient.get<UserProjection[]>(`/api/courses/${this.courseId}/members`).subscribe(data =>
    {
      this.courseMembers = data;
    });
  }


  isAddMemberModalVisible: boolean = false;
  isRemoveMemberModalVisible: boolean = false;
  allUsers: UserProjection[] = [];
  selectedUsers: UserProjection[] = [];
  unenrolledUsers: UserProjection[] = [];

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

  removeMemberModalCancel() {
    this.isRemoveMemberModalVisible = false;
  }

  addMemberModalSubmit() {
    this.isAddMemberModalVisible = false;

    let ids = this.selectedUsers.map(user => user.id);

    console.log(ids)

    this.httpClient.post(`/api/courses/${this.courseId}/members`, ids).subscribe(() => {
        this.loadMembers();
    });

    this.selectedUsers = [];
  }
  setRemoveMemberModalVisibility(visibility: boolean) {
    this.isRemoveMemberModalVisible = visibility;
    this.httpClient.get<UserProjection[]>('/api/admin/users')
      .pipe(map((users) => {
        return users
          .filter(user => this.courseMembers.some(member => member.id === user.id))
      }))
      .subscribe(data => {
        this.unenrolledUsers = data;
      })
  }
  removeMemberModalSubmit()
  {
    this.isRemoveMemberModalVisible = false;
    let ids = this.selectedUsers.map(user => user.id);

    console.log(ids)

    this.httpClient.post(`/api/courses/${this.courseId}/members/removeBulkMembers`, ids).subscribe(() => {
      this.loadMembers();
    });

    this.selectedUsers = [];
  }

  protected readonly Object = Object;
}
