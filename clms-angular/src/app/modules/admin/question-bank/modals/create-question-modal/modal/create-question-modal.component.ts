import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class CreateQuestionModalComponent implements OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    this.config.data = {
      question: this.question,
      categories: this.categories
    }
  }

}

@Component({
  standalone: true,
  selector: 'footer-create-question-modal',
  template: '<div class="w-full h-16 flex flex-row">\n' +
    '  <div class="pl-5 pr-5 pt-2 pb-2 w-full flex justify-center items-center text-center rounded outline-1 outline-black outline transition-all duration-300 hover:transition-all hover:duration-700 hover:bg-black hover:text-white cursor-pointer" (click)="this.onClose()">\n' +
    '    <span>Create</span>\n' +
    '  </div>\n' +
    '</div>\n'
})
export class CreateQuestionModalFooterComponent {
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<CreateQuestionModalDataType>, private http: HttpClient) {
  }
  onClose() {
    this.ref.close(this.config?.data?.question);
  }
}

