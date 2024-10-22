import { Component } from '@angular/core';
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";

@Component({
  selector: 'app-assignment-attempt-page',
  templateUrl: './assignment-attempt-page.component.html',
  styleUrl: './assignment-attempt-page.component.css'
})
export class AssignmentAttemptPageComponent {
  assignmentId: number | undefined;
  questions: QuestionProjection[] = [];
  currentQuestion : QuestionProjection | null = null;
  questionsLoaded = false;
  constructor(private httpClient: HttpClient,private activatedRoute:ActivatedRoute, private messageService: MessageService){
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.assignmentId = parseInt(id, 10);
      this.fetchQuestions();
    });
  }
  fetchQuestions(){
    this.httpClient.get<AssignmentProjection>(`/api/assignments/${this.assignmentId}`).subscribe(assignment=> {
      if (!assignment.questions) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No questions found for this assignment'});
        return;
      }
      this.questions = assignment.questions;
      this.questionsLoaded = true;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      console.log("Questions after fetching", this.questions)
    });

}

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  completedQuestions: number[] = [];

  handleAnswerSelect(value: string | undefined) {
    this.selectedAnswer = value || null;
    if (!this.currentQuestion){return}

    if (this.currentQuestion.id && !this.completedQuestions.includes(this.currentQuestion.id)) {
      this.completedQuestions = [...this.completedQuestions, this.currentQuestion.id];
    }
  }

  handleNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
    }
  }
  handlePreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = null;
    }
  }


  setQuestionIndex(index: number) {
    this.currentQuestionIndex = index;
    this.selectedAnswer = null;
  }
}
