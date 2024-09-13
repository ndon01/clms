import {Component, Input, Output} from '@angular/core';
import {AdminModule} from "@modules/admin/admin.module";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-question-bank-question-table',
  standalone: true,
  imports: [
    NgIf,
    PrimeTemplate,
    TableModule,
    NgForOf,
    FormsModule,
    CheckboxModule,
    TagModule
  ],
  templateUrl: './question-bank-question-table.component.html',
  styleUrl: './question-bank-question-table.component.css'
})
export class QuestionBankQuestionTableComponent {
  @Input() questions: QuestionBankQuestion[] = [];
  @Input() useCheckBoxes: boolean = true;
  @Input() checkBoxValues: QuestionBankQuestion[] = [];
  @Output() checkBoxValuesChange: QuestionBankQuestion[] = [];

  onCheckBoxClick(question: QuestionBankQuestion) {
    if (this.checkBoxValues.includes(question)) {
      this.checkBoxValues = this.checkBoxValues.filter(q => q !== question);
    } else {
      this.checkBoxValues.push(question);
    }
    this.checkBoxValuesChange = this.checkBoxValues;
  }
}
