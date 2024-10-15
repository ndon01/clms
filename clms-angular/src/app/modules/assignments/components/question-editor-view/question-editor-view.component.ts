import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AnswerProjection, QuestionProjection} from "@modules/assignments/model/question.model";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";

@Component({
  selector: 'app-question-editor-view',
  standalone: true,
  imports: [
    Button,
    CommonModule,
    CheckboxModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './question-editor-view.component.html',
  styleUrl: './question-editor-view.component.css'
})
export class QuestionEditorViewComponent {
  answers: AnswerProjection[] = [{text: "Answer 1", isCorrect: false}, {text: "Answer 1", isCorrect: false}, {text: "Answer 1", isCorrect: false}, {text: "Answer 1", isCorrect: false}];

  testInput: QuestionProjection = {
    id: 0,
    question: "",
    questionType: 'single-choice',
    answers: this.answers,
    keepAnswersOrder: false,
    allowWorkUpload: false,
    required: false
  }

  @Input() question : QuestionProjection = {
    id: 0,
    question: "",
    questionType: 'single-choice',
    answers: this.answers,
    keepAnswersOrder: false,
    allowWorkUpload: false,
    required: false
  };
}
