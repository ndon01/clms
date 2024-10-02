import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {UserProjection} from "@core/model/User.model";

@Component({
  selector: 'courses-course-settings-page',
  templateUrl: './course-settings-page.component.html',
  styleUrl: './course-settings-page.component.css'
})
export class CourseSettingsPageComponent implements OnInit{

  courseId !: number;
  availableUsers: UserProjection[] = [];
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

  setMemberModalVisibility(visibility: boolean) {
    this.isAddMemberModalVisible = visibility;
  }

  addMemberModalCancel() {
    this.isAddMemberModalVisible = false;
  }

  addMemberModalSubmit() {
    this.isAddMemberModalVisible = false;
  }

}
