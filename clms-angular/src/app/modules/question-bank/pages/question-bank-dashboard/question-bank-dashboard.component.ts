import {Component, OnInit} from '@angular/core';
import {QuestionBankCategory} from "@core/modules/openapi";
import {TreeNode} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {
  CategoryCreatedEvent,
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
    console.log(event);
    this.httpClient.post("/api/question-bank/categories/reparent", {
      categoryId: event.categoryId,
      newParentId: event.newParentId
    }).subscribe(() => {
      this.fetchCategories();
    })
  }

  onCategoryCreated($event: CategoryCreatedEvent) {
    console.log($event);
    this.httpClient.post("/api/question-bank/categories/create", {
      categoryName: $event.categoryName,
      parentId: $event.parentId
    }).subscribe(() => {
      this.fetchCategories();
    })
  }

  onCategoryTitleChanged($event: { categoryId: number; newTitle: string }) {
    this.httpClient.post("/api/question-bank/categories/update-name", {
      categoryId: $event.categoryId,
      categoryName: $event.newTitle
    }).subscribe(() => {
      this.fetchCategories();
    })
  }

  onCategoryDeleted($event: number) {
    this.httpClient.post("/api/question-bank/categories/delete", {
      categoryId: $event
    }).subscribe(() => {
      this.fetchCategories();
    })
  }
}
