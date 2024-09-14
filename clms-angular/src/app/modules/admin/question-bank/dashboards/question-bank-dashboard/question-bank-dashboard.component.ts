import {Component, OnInit} from '@angular/core';
import {AdminModule} from "@modules/admin/admin.module";
import {ButtonComponent} from "@shared/ui/button/button.component";
import {CardModule} from "primeng/card";
import {
  QuestionBankQuestionTableComponent
} from "@modules/admin/question-bank/components/question-bank-question-table/question-bank-question-table.component";
import {QuestionBankService} from "@modules/admin/question-bank/question-bank.service";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {
  CreateQuestionModalLauncherService
} from "@modules/admin/question-bank/modals/create-question-modal/launcher/create-question-modal-launcher.service";
import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";
import {
  QuestionBankCategoryDashboardComponent
} from "@modules/admin/question-bank/dashboards/question-bank-category-dashboard/question-bank-category-dashboard.component";
import {
  QuestionBankQuestionDashboardComponent
} from "@modules/admin/question-bank/dashboards/question-bank-question-dashboard/question-bank-question-dashboard.component";

@Component({
  selector: 'admin-question-bank-dashboard',
  templateUrl: './question-bank-dashboard.component.html',
  styleUrl: './question-bank-dashboard.component.css'
})
export class QuestionBankDashboardComponent implements  OnInit {
  questions : QuestionBankQuestion[] = [];
  categories: QuestionBankCategory[] = [];

  constructor(private questionBankService: QuestionBankService, private createQuestionModalLauncherService: CreateQuestionModalLauncherService){
  }


 ngOnInit() {
    this.fetchQuestions();
    this.fetchCategories();
 }

 fetchQuestions() {
   this.questionBankService.getQuestions().pipe().subscribe(questions => this.questions = questions);
 }

 fetchCategories() {
   this.questionBankService.getCategories().pipe().subscribe(categories => this.categories = categories);
 }

 clickCreateQuestion() {
    this.createQuestionModalLauncherService.launch(undefined, this.categories).onClose.subscribe((question: QuestionBankQuestion) => {
      console.log("question")
      console.log(question)
      this.questionBankService.saveQuestion(question).pipe().subscribe((question) => {
        this.fetchQuestions()
      });
    })
 }
}
