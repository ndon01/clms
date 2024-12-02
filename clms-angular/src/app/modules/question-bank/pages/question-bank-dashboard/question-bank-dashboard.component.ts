import {Component, OnInit} from '@angular/core';
import {
  AssignmentQuestion, PageinationInformationDto,
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
import {
  SelectCategoriesDialogComponent
} from "@modules/question-bank/modals/select-categories-dialog/select-categories-dialog.component";

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
  categoriesTree: TreeNode[] = [];
  selectedCategories: QuestionBankCategory[] = []
  categoryIdToTreeNodeMap = new Map<number, TreeNode>();


  constructor(private httpClient: HttpClient, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.fetchCategories();
    this.fetchQuestionHead();
    this.fetchQuestions(this.currentPage, this.pageSize)
  }

  onPageChange(event: any) {
    if (event.first === 0) {
      this.currentPage = 0;
    } else {
      this.currentPage = event.first / event.rows;
    }
    this.pageSize = event.rows;
    this.fetchQuestionHead();
    this.fetchQuestions(this.currentPage, this.pageSize);
  }

  fetchQuestionHead() {
    this.httpClient.get<PageinationInformationDto>('api/question-bank/questions/pageable/head', {
        params: {
          filterByCategoryIds: this.generateSelectedCategories().join(',')
        }
      }
    ).subscribe((data) => {
      this.totalRecords = data.totalRecords;
    })
  }

  fetchQuestions(page: number = 0, size: number = 5) {

    this.httpClient
      .get<QuestionBankQuestionProjection[]>(`/api/question-bank/questions/pageable`,{
        params:{
          page: page.toString(),
          size: size.toString(),
          filterByCategoryIds: this.generateSelectedCategories().join(',')
        }
      })
      .subscribe((questions) => {
        this.questions = questions
      });
  }

  generateSelectedCategories(): number[] {
    let searchSelectedCategories: number[] = [];
    const applyQBC = (c: QuestionBankCategory) => {
      if (c.id != undefined) {
        const treeNode = this.categoryIdToTreeNodeMap.get(c.id);
        if (treeNode) {
          if (treeNode.children) {
            treeNode.children.forEach(child => {
              applyQBC(child.data);
            });
          }
          if (treeNode.data) {
            searchSelectedCategories.push(treeNode.data.id);
          }
        }
      }

    }
    if (Array.isArray(this.selectedCategories)) {
      this.selectedCategories.forEach(selectedCategory => {
        applyQBC(selectedCategory);
      });
    }
    return searchSelectedCategories;
  }



  fetchCategories() {
    this.httpClient.get<QuestionBankCategory[]>("/api/question-bank/categories").subscribe(data => {
      this.categories = data;
      this.categoriesTree = this.mapCategoriesToTree(data);
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

  mapCategoriesToTree(categories: QuestionBankCategory[]): TreeNode[] {
    this.categoryIdToTreeNodeMap.clear();
    const idToNodeMap = this.categoryIdToTreeNodeMap;
    const tree: TreeNode[] = [];

    categories.forEach(category => {
      const treeNode: TreeNode = {
        label: category.categoryName,
        data: category,
        children: [],
      };
      idToNodeMap.set(category.id!, treeNode);

      if (category.parentId) {
        const parent = idToNodeMap.get(category.parentId);
        if (parent) {
          parent.children!.push(treeNode);
        }
      } else {
        tree.push(treeNode);
      }
    });

    return tree;
  }

  editQuestionCategories(question: QuestionBankQuestionProjection) {
    const selectedCategories: QuestionBankCategory[] = []
    question.categoryIds?.forEach(id => {
      const category = this.categories.find(c => c.id === id);
      if (category) {
        selectedCategories.push(category);
      }
    })

    const ref = this.dialogService.open(SelectCategoriesDialogComponent, {
      header: "Edit Question Categories",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        categories: this.categories,
        multiple: true,
        selectedCategories: selectedCategories,
        noneSelectedAllowed: true
      }
    })

    ref.onClose.subscribe(selectedCategoryIds => {
      if (selectedCategoryIds === undefined) {
        console.log("Cancel")
        return
      }

      this.httpClient.post("/api/question-bank/questions/categories/update", {
        questionId: question.id,
        categoryIds: selectedCategoryIds.map(c => c.id)
      }, {
        observe: 'response'
      }).subscribe().add(() => {
        this.fetchCategories();
        this.fetchQuestions(this.currentPage, this.pageSize);

      })
    })
  }

  getCategoryPath(categoryId: number): string {
    const categoryMap = new Map<number, QuestionBankCategory>();
    this.categories.forEach((category) => categoryMap.set(category.id!, category));

    const buildPath = (id: number): string => {
      const category = categoryMap.get(id);
      if (category) {
        return category.parentId ? `${buildPath(category.parentId)} -> ${category.categoryName}` : (category?.categoryName || 'FAILED TO LOAD');
      }
      return '';
    };

    return buildPath(categoryId);
  }



  openSelectCategory(page: number = 0, size: number = 5) {
    const ref = this.dialogService.open(SelectCategoriesDialogComponent, {
      header: "Filter by Categories",
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        categories: this.categories,
        multiple: true,
        selectedCategories: this.selectedCategories,
        noneSelectedAllowed: true
      }
    })
    ref.onClose.subscribe(selectedCategoryIds => {
        if (selectedCategoryIds === null) {
          console.log("Cancel")
          return
        }

        this.selectedCategories = selectedCategoryIds;
        this.fetchQuestions(page, size);
        this.fetchQuestionHead();
    })
    }
  clear(){
    this.selectedCategories = [];
    this.fetchQuestions(this.currentPage, this.pageSize);
    this.fetchQuestionHead();
  }
}
