import { Injectable } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {AdminModule} from "@modules/admin/admin.module";
import {User} from "@core/model/User.model";
import {
  CreateUserModalComponent
} from "@modules/admin/users/modals/create-user-modal/modal/create-user-modal.component";
import {FooterComponent} from "@modules/admin/users/modals/create-user-modal/footer/footer.component";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {CreateButtonFooter} from "@shared/ui/modals/footers/create-footer/footer.component";
import {
  CreateQuestionModalComponent
} from "@modules/admin/question-bank/modals/create-question-modal/modal/create-question-modal.component";
@Injectable({
  providedIn: AdminModule,
  useFactory: (dialogService: DialogService) => new CreateQuestionModalLauncherService(dialogService),
})
export class CreateQuestionModalLauncherService {

  constructor(private dialogService: DialogService) { }

  launch(question?: QuestionBankQuestion) {
      return this.dialogService.open(CreateQuestionModalComponent, {
        data: question,
        header: "Create Question",
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        templates: {
          footer: CreateButtonFooter
        }
      })
    }
}
