import { Component } from '@angular/core';
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Course, CourseProjection} from "@modules/courses/model/course.model";
import {AssignmentAttemptAnswerProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";

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
  assignmentAttemptAnswers: AssignmentAttemptAnswerProjection[] | null = null;
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
      this.fetchAssignmentAttempt();
    });
  }
  fetchAssignment(){
    this.httpClient.get<AssignmentAttemptAnswerProjection[]>(`/api/assignments/${this.assignmentId}`).subscribe(assignmentAttemptAnswers=> {
      this.assignmentAttemptAnswers = assignmentAttemptAnswers;
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
fetchAssignmentAttempt(){
    this.httpClient.get(`/api/assignments/attempts/get-assignment-attempt-answers`,{
    params: {assignmentId: this.assignmentId?.toString() || ""}}).subscribe(attempt=> {
    console.log("Attempt: ", attempt)
    })
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
    if (!this.assignmentAttemptAnswers){
      return
    }
    for(let answer of Object.values(this.assignmentAttemptAnswers)){
      if(answer.questionId === this.currentQuestion.id){
        answer.selectedAnswerId = this.selectedAnswer || "";
        return;
      }
    }
    if (this.currentQuestion.id && !this.completedQuestions.includes(this.currentQuestion.id)) {
      this.completedQuestions = [...this.completedQuestions, this.currentQuestion.id];
    }
  }

  saveQuestionAttempt() {
    this.httpClient.post(`/api/assignments/attempts/update-question-attempt`, {
      questionId: this.currentQuestion?.id,
      answer: this.selectedAnswer,
      assignmentId: this.assignmentId
    }).subscribe(response => {
      console.log(response);
    })
  }
  updateSelectedAnswer(){
    if (!this.assignmentAttemptAnswers || !this.currentQuestion){
      return
    }
    for(let answer of Object.values(this.assignmentAttemptAnswers)){
      if(answer.questionId === this.currentQuestion.id){
        this.selectedAnswer = answer.selectedAnswerId || "";
        return;
      }
    }
  }
  handleNextQuestion() {
    this.saveQuestionAttempt()
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex = this.currentQuestionIndex + 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    this.updateSelectedAnswer();
  }

  handlePreviousQuestion() {
    this.saveQuestionAttempt()
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex = this.currentQuestionIndex - 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    this.updateSelectedAnswer();
  }
  handleSubmit(){
    this.saveQuestionAttempt()
  }


  setQuestionIndex(index: number) {
    this.currentQuestionIndex = index;
    this.selectedAnswer = null;
  }
}
