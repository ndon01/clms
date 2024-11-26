import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {Location, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {
  AssignmentProjection,
  AssignmentQuestion,
  AssignmentQuestionProjection, CourseDetailsProjection, CourseProjection,
  QuestionBankQuestion,
  QuestionGenerationOrderEntity
} from "@core/modules/openapi";
import {DialogService} from "primeng/dynamicdialog";
import {QuestionEditModalComponent} from "@modules/questions/modals/question-edit-modal/question-edit-modal.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {
  SelectCategoriesDialogComponent
} from "@modules/question-bank/modals/select-categories-dialog/select-categories-dialog.component";
import {
  SelectCoursesDialogComponent
} from "@modules/question-generation/modal/select-courses-dialog/select-courses-dialog.component";

interface OrderOutput {
    questions: {
        title: string;
        question: string;
        answers: {
            isCorrect: boolean;
            text: string;
        }[];
    }[];
    generatedQuestionIds: number[];
}

@Component({
    selector: 'app-order-overview-page',
    standalone: true,
    imports: [
        ButtonDirective,
        CalendarModule,
        DialogModule,
        InputNumberModule,
        NgIf,
        PaginatorModule,
        PrimeTemplate,
        Ripple,
        TableModule
    ],
    templateUrl: './order-overview-page.component.html',
    styleUrl: './order-overview-page.component.css'
})
export class OrderOverviewPageComponent implements OnInit {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private location: Location,
              private dialogService: DialogService,
              private messageService: MessageService
  ) {
  }

  orderId!: number;
  order: QuestionGenerationOrderEntity | undefined;

  questions: AssignmentQuestionProjection[] = [];
  selectedQuestion: AssignmentQuestionProjection | undefined;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.orderId = parseInt(id, 10);
      this.getOrder();
    });
  }

  getOrder(): void {
    this.httpClient
      .get<QuestionGenerationOrderEntity[]>('/api/questions/getCompletedOrders', {
        params: {id: this.orderId}
      })
      .subscribe(response => {
        this.order = response.filter(o => o.id === this.orderId).pop();
        const orderOutput = this.order?.orderOutput as OrderOutput | undefined;
        if (orderOutput?.generatedQuestionIds) {
          this.fetchQuestions();
        } else {
          this.convertOrderQuestionsToAssignmentQuestions();
        }
      });
  }

  convertOrderQuestionsToAssignmentQuestions(): void {
    const orderOutput = this.order?.orderOutput as OrderOutput | undefined;
    if (orderOutput?.questions) {
      this.questions = orderOutput.questions.map(q => ({
        title: q.title,
        question: q.question,
        answers: q.answers
      }));
    }
  }

  fetchQuestions(): void {
    const orderOutput = this.order?.orderOutput as OrderOutput | undefined;
    const ids = orderOutput?.generatedQuestionIds;
    if (ids) {
      this.httpClient.get<AssignmentQuestionProjection[]>(`/api/questions/getByIds`, {
        params: {ids: ids.join()}
      }).subscribe(response => {
        this.questions = response;
      })
    }

  }

  goBack() {
    this.location.back();
  }

  deleteQuestion(selectedQuestion: AssignmentQuestionProjection) {
    const url = `/api/assignments/questions/${selectedQuestion.id}`;
    this.httpClient.delete(url).subscribe(
      response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Question deleted successfully.'
        })
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while deleting the question.'
        })
      }
    ).add(() => {
      this.fetchQuestions();
    });
  }

  exportQuestionToQuestionBankQuestion(selectedQuestion: AssignmentQuestionProjection) {
    const questionBankQuestion: QuestionBankQuestion = {
      id: selectedQuestion.id,
    }
    this.httpClient.post(`/api/question-bank/questions/create`, questionBankQuestion,
      {observe: 'response', responseType: 'text'}
    ).subscribe(
      (response) => {
        if (response.status === 200) {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response?.body?.toString() || "Question exported successfully."
          })
        }
      }, error => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error?.error || "An error occurred while exporting the question."
        })
      }
    )
  }

  selectQuestion(q: AssignmentQuestionProjection) {
    this.selectedQuestion = q;
    this.dialogService.open(
      QuestionEditModalComponent,
      {
        header: "Edit Question",
        width: '50vw',
        contentStyle: {overflow: 'auto'},
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        data: {
          question: this.selectedQuestion as AssignmentQuestion
        }
      }
    ).onClose.subscribe((response: AssignmentQuestion | null) => {
      if (response) {
        this.selectedQuestion = response;
        this.httpClient.post(`/api/questions/update-question`, this.selectedQuestion).subscribe(
          response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question updated successfully.'
            })
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while updating the question.'
            })
          }
        )
      }
    })
  }


  createAssignment() {
    this.httpClient.get<CourseDetailsProjection[]>(`/api/courses/getMyCourses`).subscribe(
      (response) => {
        const ref = this.dialogService.open(SelectCoursesDialogComponent, {
          header: 'Create assignment for course',
          width: '500px',
          data: {
            courses: response,
            multiple: false,
          },
        });

        ref.onClose.subscribe((result: {
          selectedCourses: CourseProjection | undefined;
          newAssignment: AssignmentProjection
        } | undefined) => {
          if (result && result.selectedCourses) {
            console.log("result", result)
            let selectedCourses = result.selectedCourses;
            let assignment = result.newAssignment;
            //only works for when a user slects one course
            const selectedCourseID = selectedCourses[0].id;
            const assignmentRequestBody : AssignmentProjection = {
              name: assignment.name,
              description: assignment.description,
              startDate: assignment.startDate,
              dueDate: assignment.dueDate,
            }
            const cloneQuestions = true;
            this.httpClient
              .post(`/api/assignments/upsert?cloneQuestions=${cloneQuestions}`, {
                assignmentInfo:  assignmentRequestBody,
                questionIds:   this.questions.filter(q => q.id).map(q => q.id),
                courseId: selectedCourseID
              })
              .subscribe(
                (response) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Assignment created successfully.',
                  });
                  this.router.navigate([`/assignments/${response}/overview`]);
                },
                (error) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'An error occurred while creating the assignment.',
                  });
                }
              );
          }
        });
      }
    );

  }}
