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
  QuestionBankCategoryTableComponent
} from "@modules/admin/question-bank/components/question-bank-category-table/question-bank-category-table.component";
import {
  CreateCategoryModalLauncherService
} from "@modules/admin/question-bank/modals/create-category-modal/launcher/create-category-modal-launcher.service";

@Component({
  selector: 'app-question-bank-category-dashboard',
  templateUrl: './question-bank-category-dashboard.component.html',
  styleUrl: './question-bank-category-dashboard.component.css'
})
export class QuestionBankCategoryDashboardComponent implements  OnInit {
  categories: QuestionBankCategory[] = [];

  constructor(private questionBankService: QuestionBankService, private createCategoryModalLauncherService: CreateCategoryModalLauncherService){
  }


 ngOnInit() {
    this.fetchCategories();
 }

 fetchCategories() {
   this.questionBankService.getCategories().pipe().subscribe(categories => this.categories = categories);
 }

  onCreateCategory() {
    this.createCategoryModalLauncherService.launch(undefined, this.categories).onClose.subscribe((category: QuestionBankCategory) => {
      console.log("category")
      console.log(category)
      this.questionBankService.saveCategory(category).subscribe(() => {
        this.fetchCategories();
      })
    })
  }
}
