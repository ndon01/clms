import {Component, OnInit} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Footer} from "primeng/api";
import {Button} from "primeng/button";
import {ClientCourseMemberDetailsProjection, CourseMemberProjection, UserProjection} from "@core/modules/openapi";
import {HttpClient} from "@angular/common/http";
import {CheckboxModule} from "primeng/checkbox";

export interface EditTitleModalData {
  title: string;
  member: CourseMemberProjection;
}

@Component({
  selector: 'app-edit-title-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    Footer,
    Button,
    CheckboxModule
  ],
  templateUrl: './course-member-update-modal.component.html',
  styleUrls: ['./course-member-update-modal.component.css']
})
export class CourseMemberUpdateModalComponent implements OnInit {
  editTitleForm: FormGroup;
  courseMember?: CourseMemberProjection;
  courseMemberUser: UserProjection | null = null;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig<EditTitleModalData>,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.editTitleForm = this.fb.group({
      tutor:  [config.data?.member?.tutor || false, []]
    });
    this.courseMember = config.data?.member;
  }

  submit() {
    if (this.editTitleForm.valid) {


      this.ref.close(this.editTitleForm.value);  // Pass the form value back on submit
    }
  }

  close() {
    this.ref.close();
  }

  ngOnInit(): void {
    this.httpClient.get('/api/v1/users/' + this.courseMember?.user?.id).subscribe((res: any) => {
      this.courseMemberUser = res;
    });
  }
}
