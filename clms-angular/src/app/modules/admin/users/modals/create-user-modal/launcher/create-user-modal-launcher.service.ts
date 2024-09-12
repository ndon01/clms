import { Injectable } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {AdminModule} from "@modules/admin/admin.module";
import {User} from "@core/model/User.model";
import {
  CreateUserModalComponent
} from "@modules/admin/users/modals/create-user-modal/modal/create-user-modal.component";
import {FooterComponent} from "@modules/admin/users/modals/create-user-modal/footer/footer.component";
@Injectable({
  providedIn: AdminModule,
  useFactory: (dialogService: DialogService) => new CreateUserModalLauncherService(dialogService),
})
export class CreateUserModalLauncherService {

  constructor(private dialogService: DialogService) { }

  launch(user?: User) {
      return this.dialogService.open(CreateUserModalComponent, {
        data: user,
        header: "Create User",
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
