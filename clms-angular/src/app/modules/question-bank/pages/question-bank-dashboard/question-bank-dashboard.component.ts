import {Component, OnInit} from '@angular/core';
import {
  AssignmentQuestion,
  QuestionBankCategory,
  QuestionBankQuestionProjection
} from "@core/modules/openapi";
import {TreeNode} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {
  CategoryCreatedEvent,
  CategoryReparentedEvent
} from "@modules/question-bank/components/category-tree-view/category-tree-view.component";
import {DialogService} from "primeng/dynamicdialog";
import {QuestionEditModalComponent} from "@modules/questions/modals/question-edit-modal/question-edit-modal.component";

@Component({
  selector: 'app-question-bank-dashboard',
  templateUrl: './question-bank-dashboard.component.html',
  styleUrl: './question-bank-dashboard.component.css',

})
export class QuestionBankDashboardComponent implements OnInit {
  categories: QuestionBankCategory[] = []
  questions: QuestionBankQuestionProjection[] = [];
  totalRecords?: number = 0;
  pageSize?: number = 5; // Default page size
  currentPage?: number = 0; // Default page number
  constructor(private httpClient: HttpClient, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.fetchCategories();
    this.fetchQuestions(this.currentPage, this.pageSize)
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.fetchQuestions(this.currentPage, this.pageSize);
  }

  fetchQuestions(page: number = 0, size: number = 5) {
    this.httpClient
      .get<QuestionBankQuestionProjection[]>(`/api/question-bank/questions/pageable?page=${page}&size=${size}`)
      .subscribe((questions) => {
        this.questions = questions
        this.totalRecords = questions.length; // Save total records for pagination
      });
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

  protected readonly JSON = JSON;

  editQuestion(question: QuestionBankQuestionProjection) {
    const ref = this.dialogService.open(QuestionEditModalComponent, {
      header: "Edit Question",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        question: question.question as AssignmentQuestion
      }
    })

    ref.onClose.subscribe(res => {
      if (!res) {
        console.log("Cancel")
        return
      }

      console.log(res)
    })
  }
}
