import { Component } from '@angular/core';
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Course, CourseProjection} from "@modules/courses/model/course.model";

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
  assignment : AssignmentProjection | null = null;
  course : CourseProjection | null = null;
  constructor(private httpClient: HttpClient,
              private activatedRoute:ActivatedRoute,
              private messageService: MessageService,
              private sanitizer: DomSanitizer
  ){

  }
  //to get course and assignment name should be able to fetch assignment from id and then that should have the course id to get the name

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.assignmentId = parseInt(id, 10);
      this.fetchQuestions();
      this.fetchAssignment();
      this.fetchCourse();
    });
  }
  fetchAssignment(){
    this.httpClient.get<AssignmentProjection>(`/api/assignments/${this.assignmentId}`).subscribe(assignment=> {
      this.assignment = assignment;
      console.log("Assignment: ", this.assignment)
    });
  }
  fetchCourse(){
    this.httpClient.get<CourseProjection>(`/api/courses/getCourseFromAssignment`, {params: {"assignmentId":this.assignmentId?.toString() || ""}}).subscribe(course=> {
      console.log("Course: ", course)
      this.course = course;
    })}

  fetchQuestions(){
    this.httpClient.get<AssignmentProjection>(`/api/assignments/${this.assignmentId}/attempt`).subscribe(assignment=> {
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

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(<string>html);
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
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }
  handlePreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedAnswer = null;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }


  setQuestionIndex(index: number) {
    this.currentQuestionIndex = index;
    this.selectedAnswer = null;
  }
}
