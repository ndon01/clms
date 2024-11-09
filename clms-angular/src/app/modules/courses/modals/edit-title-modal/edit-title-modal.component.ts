import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Footer} from "primeng/api";
import {Button} from "primeng/button";

export interface EditTitleModalData {
  title: string;
}

@Component({
  selector: 'app-edit-title-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    Footer,
    Button
  ],
  templateUrl: './edit-title-modal.component.html',
  styleUrls: ['./edit-title-modal.component.css']
})
export class EditTitleModalComponent {
  editTitleForm: FormGroup;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig<EditTitleModalData>,
    private fb: FormBuilder
  ) {
    this.editTitleForm = this.fb.group({
      title: [config.data?.title || '', [Validators.required, Validators.maxLength(255)]]
    });
  }

  submit() {
    if (this.editTitleForm.valid) {
      this.ref.close(this.editTitleForm.value);  // Pass the form value back on submit
    }
  }

  close() {
    this.ref.close();
  }
}
