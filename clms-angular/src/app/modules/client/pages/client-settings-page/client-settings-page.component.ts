import { Component } from '@angular/core';
import {CoreModule} from "@core/core.module";
import {Button} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {
  UpdatePasswordModalComponent
} from "@modules/client/modals/update-password-modal/update-password-modal.component";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-client-settings-page',
  templateUrl: './client-settings-page.component.html',
  styleUrl: './client-settings-page.component.css'
})
export class ClientSettingsPageComponent {
  constructor(private dialogService: DialogService,
              private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  startUpdatePassword() {
    this.dialogService.open(UpdatePasswordModalComponent, {
      header: 'Update Password',
      width: '500px',
      style: {
        'border-radius': '10px'
      }
    }).onClose.subscribe((result) => {
      if (result) {
        console.log("Update password result", result);
        this.httpClient.post("/api/v1/authentication/passwords/update", {
          currentPassword: result.currentPassword,
          newPassword: result.newPassword
        }, {
          observe: 'response'
        }).subscribe(res => {
          if (res.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password updated successfully'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update password'
            });
          }
        });
      }
    });
  }
}
