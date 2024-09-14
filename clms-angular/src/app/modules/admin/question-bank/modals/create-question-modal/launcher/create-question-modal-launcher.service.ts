import { Injectable } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {
  CreateQuestionModalComponent, CreateQuestionModalFooterComponent
} from "@modules/admin/question-bank/modals/create-question-modal/modal/create-question-modal.component";
import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";
import {AdminQuestionBankModule} from "@modules/admin/question-bank/admin-question-bank.module";
@Injectable({
  providedIn: AdminQuestionBankModule,
  useFactory: (dialogService: DialogService) => new CreateQuestionModalLauncherService(dialogService),
})
export class CreateQuestionModalLauncherService {

  constructor(private dialogService: DialogService) { }

  launch(question: QuestionBankQuestion = {
    id: -1,
    questionName: '',
    categories: []
  }, categories: QuestionBankCategory[] = []) {
      return this.dialogService.open(CreateQuestionModalComponent, {
        data: {
          question: question,
          categories: categories
        },
        header: "Create Question",
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        templates: {
          footer: CreateQuestionModalFooterComponent
        }
      })
    }
}
