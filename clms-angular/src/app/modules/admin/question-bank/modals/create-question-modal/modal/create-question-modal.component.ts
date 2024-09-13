import {Component, Input, OnInit} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {BehaviorSubject} from "rxjs";
import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";
import {HttpClient} from "@angular/common/http";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";


type CreateQuestionModalDataType = {
  question: QuestionBankQuestion;
  categories: QuestionBankCategory[];
}

@Component({
  selector: 'admin-create-question-modal',
  templateUrl: './create-question-modal.component.html',
})
export class CreateQuestionModalComponent {
  question: QuestionBankQuestion = {
    id: -1,
    questionName: '',
    categories: []
  };

  categories: QuestionBankCategory[] = [];

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig<CreateQuestionModalDataType>, private http: HttpClient) {
    if (config.data !== undefined) {
      this.question = config.data.question;
      this.categories = config.data.categories;
    }
  }

}
