import {Component, Input} from '@angular/core';
import {AdminModule} from "@modules/admin/admin.module";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";

@Component({
  selector: 'app-question-bank-question-table',
  standalone: true,
  imports: [
    NgIf,
    PrimeTemplate,
    TableModule,
    NgForOf
  ],
  templateUrl: './question-bank-question-table.component.html',
  styleUrl: './question-bank-question-table.component.css'
})
export class QuestionBankQuestionTableComponent {
  @Input() questions: QuestionBankQuestion[] = [];
}
