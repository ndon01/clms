import { Component } from '@angular/core';

@Component({
  selector: 'courses-course-settings-page',
  templateUrl: './course-settings-page.component.html',
  styleUrl: './course-settings-page.component.css'
})
export class CourseSettingsPageComponent {
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
