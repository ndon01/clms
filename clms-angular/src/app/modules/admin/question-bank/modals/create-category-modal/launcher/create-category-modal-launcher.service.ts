import { Injectable } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";
import {
  CreateCategoryModalComponent, CreateCategoryModalFooterComponent
} from "@modules/admin/question-bank/modals/create-category-modal/modal/create-category-modal.component";
import {AdminQuestionBankModule} from "@modules/admin/question-bank/admin-question-bank.module";
@Injectable({
  providedIn: AdminQuestionBankModule,
  useFactory: (dialogService: DialogService) => new CreateCategoryModalLauncherService(dialogService),
})
export class CreateCategoryModalLauncherService {

  constructor(private dialogService: DialogService) { }

  launch(category: QuestionBankCategory = {
    id: -1,
    categoryName: '',
    categories: []
  }, categories: QuestionBankCategory[] = []) {
      return this.dialogService.open(CreateCategoryModalComponent, {
        data: {
          category: category,
          categories: categories
        },
        header: "Create Category",
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        templates: {
          footer: CreateCategoryModalFooterComponent
        }
      })
    }
}
