import {Component, OnInit} from '@angular/core';
import {AdminModule} from "@modules/admin/admin.module";
import {ButtonComponent} from "@shared/ui/button/button.component";
import {CardModule} from "primeng/card";
import {
  QuestionBankQuestionTableComponent
} from "@modules/admin/question-bank/components/question-bank-question-table/question-bank-question-table.component";
import {QuestionBankService} from "@modules/admin/question-bank/question-bank.service";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";

@Component({
  selector: 'app-question-bank-question-dashboard',
  standalone: true,
  imports: [
    ButtonComponent,
    CardModule,
    QuestionBankQuestionTableComponent,
  ],
  templateUrl: './question-bank-question-dashboard.component.html',
  styleUrl: './question-bank-question-dashboard.component.css'
})
export class QuestionBankQuestionDashboardComponent implements  OnInit {
  questions : QuestionBankQuestion[] = [];
  constructor(private questionBankService: QuestionBankService){

  }
 ngOnInit() {
    this.questionBankService.getQuestions().pipe().subscribe(questions => this.questions = questions);
 }
}
