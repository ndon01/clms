import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AdminModule} from "@modules/admin/admin.module";
import {NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {User} from "@core/model/User.model";
import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";

@Component({
  selector: 'app-question-bank-category-table',
  templateUrl: './question-bank-category-table.component.html',
  styleUrl: './question-bank-category-table.component.css'
})
export class QuestionBankCategoryTableComponent {
  @Input() categories: QuestionBankCategory[] = [];
}
