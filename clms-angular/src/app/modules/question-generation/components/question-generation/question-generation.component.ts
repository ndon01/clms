import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {HttpClient} from "@angular/common/http";
import {MessageService, PrimeTemplate} from "primeng/api";
import {AssignmentQuestion, AssignmentQuestionProjection, QuestionGenerationOrderEntity} from "@core/modules/openapi";
import {interval, Subscription} from "rxjs";
import {CoursesModule} from "@modules/courses/courses.module";
import {DatePipe, NgIf} from "@angular/common";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-question-generation',
  templateUrl: './question-generation.component.html',
  standalone: true,
  imports: [
    FormsModule,
    Button,
    CoursesModule,
    DatePipe,
    NgIf,
    PrimeTemplate,
    ScrollPanelModule,
    TableModule,
    TagModule,
    RouterLink
  ],
  styleUrl: './question-generation.component.css'
})
export class QuestionGenerationComponent implements OnInit{
  constructor(private http: HttpClient,private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.getCompletedOrders();
  }
  url: string = '';
  completedOrders : QuestionGenerationOrderEntity[] = [];
  handleSubmit(event: Event): void {
    event.preventDefault();
    this.http.post('/api/questions/generate-from-youtube-video', { url: this.url }).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Questions generated successfully' });
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to generate questions'})
      },
    );
  }
  getCompletedOrders():void {
    this.http.get<QuestionGenerationOrderEntity[]>("/api/questions/getCompletedOrders").subscribe(
      response => {
        this.completedOrders = response
    })

  }
}
