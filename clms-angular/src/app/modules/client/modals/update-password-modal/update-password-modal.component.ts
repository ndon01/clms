import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-password-modal',
  standalone: true,
  imports: [
    ButtonDirective,
    FormsModule,
    NgIf,
  ],
  templateUrl: './update-password-modal.component.html',
  styleUrls: ['./update-password-modal.component.css']
})
export class UpdatePasswordModalComponent {
  currentPassword: string = '';
  newPassword: string = '';
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  cancelModal() {
    this.ref.close(null);
  }

  finishModal() {
    if (this.isFormValid()) {
      this.ref.close({ currentPassword: this.currentPassword, newPassword: this.newPassword });
    }
  }

  isFormValid(): boolean {
    return (
      this.currentPassword.trim() !== '' &&
      this.newPassword.trim() !== '' &&
      this.currentPassword !== this.newPassword
    );
  }
}
