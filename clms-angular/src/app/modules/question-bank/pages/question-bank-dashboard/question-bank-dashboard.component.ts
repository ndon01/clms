import {Component, OnInit} from '@angular/core';
import {QuestionBankCategory} from "@core/modules/openapi";
import {TreeNode} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {
  CategoryReparentedEvent
} from "@modules/question-bank/components/category-tree-view/category-tree-view.component";

@Component({
  selector: 'app-question-bank-dashboard',
  templateUrl: './question-bank-dashboard.component.html',
  styleUrl: './question-bank-dashboard.component.css',

})
export class QuestionBankDashboardComponent implements OnInit {
  categories: QuestionBankCategory[] = []

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.httpClient.get<QuestionBankCategory[]>("/api/question-bank/categories").subscribe(data => {
      this.categories = data;
    })
  }

  onCategoryReparented(event: CategoryReparentedEvent) {
    this.httpClient.post("/api/question-bank/categories/reparent", {
      categoryId: event.categoryId,
      newParentId: event.newParentId
    }).subscribe(() => {
      this.fetchCategories();
    })
  }
}
