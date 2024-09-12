import { Injectable } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {AdminModule} from "@modules/admin/admin.module";
import {EditUserModalComponent} from "@modules/admin/users/modals/edit-user-modal/modal/edit-user-modal.component";
import {FooterComponent} from "@modules/admin/users/modals/edit-user-modal/footer/footer.component";
@Injectable({
  providedIn: AdminModule,
  useFactory: (dialogService: DialogService) => new EditUserModalLauncherService(dialogService),
})
export class EditUserModalLauncherService {

  constructor(private dialogService: DialogService) { }

  launch(user: User) {
    return this.dialogService.open(EditUserModalComponent, {
      data: user,
      header: "Edit User",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      templates: {
        footer: FooterComponent
      }
    })
  }
}
