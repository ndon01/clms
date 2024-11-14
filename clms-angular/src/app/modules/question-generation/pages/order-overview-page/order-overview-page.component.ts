import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {Location, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AssignmentQuestion, AssignmentQuestionProjection, QuestionGenerationOrderEntity} from "@core/modules/openapi";
interface OrderOutput {
  questions: {
    title: string;
    question: string;
    answers: {
      isCorrect: boolean;
      text: string;
    }[];
  }[];
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
export class OrderOverviewPageComponent implements OnInit{
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private location: Location
  ) {}
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
        params: { id: this.orderId }
      })
      .subscribe(response => {
        this.order = response.filter(o => o.id === this.orderId).pop();
        this.convertOrderQuestionsToAssignmentQuestions();
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
  goBack(){
    this.location.back();
  }


  selectQuestion(q: AssignmentQuestionProjection){
    this.selectedQuestion = q;
    this.openEditQuestionModal();
  }

  private openEditQuestionModal() {

  }
}
