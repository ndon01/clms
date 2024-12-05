import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CourseCategoryPerformanceDto,
  QuestionBankCategory,
  TimestampedCategoryPerformanceDto
} from '@core/modules/openapi';
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {CourseProjection} from "@modules/courses/model/course.model";
import {AssignmentAttemptAnswerProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";
import {Subject, tap} from "rxjs";
import {MessageService} from "primeng/api";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-course-performance-page',
  templateUrl: './course-category-reinforcement-page.component.html',
  styleUrls: ['./course-category-reinforcement-page.component.css']
})
export class CourseCategoryReinforcementPageComponent implements OnInit {
  assignmentId: number | undefined;
  questions: QuestionProjection[] = [];
  currentQuestion : QuestionProjection | null = null;
  questionsLoaded = false;
  assignment : AssignmentProjection | null = null;
  course : CourseProjection | null = null;
  assignmentAttemptAnswers: AssignmentAttemptAnswerProjection[] | null = null;
  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  completedQuestions: number[] = [];

  private autoSaveSubject = new Subject<void>();

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private sanitizer: DomSanitizer,
              private router: Router
  ) {
    // Set up the auto-save to debounce frequent calls
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.assignmentId = parseInt(id, 10);
      this.fetchQuestions();
      this.fetchAssignment();
      this.fetchAssignmentAttempt();
      this.fetchCourse();
    });
  }

  fetchAssignment() {
    this.httpClient.get<AssignmentProjection>(`/api/assignments/${this.assignmentId}`).subscribe(assignmentAttemptAnswers => {
      this.assignment = assignmentAttemptAnswers;
      console.log("Assignment: ", this.assignment);
    });
  }

  fetchCourse() {
    this.httpClient.get<CourseProjection>(`/api/courses/getCourseFromAssignment`, { params: { "assignmentId": this.assignmentId?.toString() || "" } })
      .subscribe(course => {
        console.log("Course: ", course);
        this.course = course;
      });
  }

  fetchQuestions() {
    this.httpClient.get<AssignmentProjection>(`/api/assignments/${this.assignmentId}/attempt`).subscribe(assignment => {
      if (!assignment.questions) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No questions found for this assignment' });
        return;
      }
      this.questions = assignment.questions;
      this.questionsLoaded = true;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      console.log("Questions after fetching", this.questions);
    });
  }

  fetchAssignmentAttempt() {
    this.httpClient.get<AssignmentAttemptAnswerProjection[]>(`/api/assignments/attempts/get-assignment-attempt-answers`, {
      params: { assignmentId: this.assignmentId?.toString() || "" }, observe: 'response'
    })
      .pipe(tap(response => {
        if (response.status === 404) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Assignment attempt not found' });
        }
      })).subscribe((response) => {
      this.assignmentAttemptAnswers = response.body;
      this.assignmentAttemptAnswers?.forEach(answer => {
        if (answer.selectedAnswerId) {
          this.completedQuestions.push(<number>answer.questionId);
        }
      });
      this.updateSelectedAnswer();
    });
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(<string>html);
  }

  handleAnswerSelect(value: string | undefined) {
    if (!this.currentQuestion) { return; }
    if (!this.assignmentAttemptAnswers) { return; }
    if (this.currentQuestion.id && !this.completedQuestions.includes(this.currentQuestion.id)) {
      this.completedQuestions = [...this.completedQuestions, this.currentQuestion.id];
    }
    for (let answer of Object.values(this.assignmentAttemptAnswers)) {
      if (answer.questionId === this.currentQuestion.id) {
        answer.selectedAnswerId = this.selectedAnswer || "";
        return;
      }
    }
  }

  saveQuestionAttempt() {
    if (!this.currentQuestion || !this.selectedAnswer) {
      return;
    }
    this.handleAnswerSelect(this.selectedAnswer);

    this.httpClient.post(`/api/assignments/attempts/update-question-attempt`, {
      questionId: this.currentQuestion?.id,
      selectedAnswerId: this.selectedAnswer,
      assignmentId: this.assignmentId
    }).subscribe(response => {
      console.log(response);
    });
  }

  updateSelectedAnswer() {
    if (!this.assignmentAttemptAnswers || !this.currentQuestion) {
      return;
    }
    for (let answer of Object.values(this.assignmentAttemptAnswers)) {
      if (answer.questionId === this.currentQuestion.id) {
        this.selectedAnswer = answer.selectedAnswerId || "";
        return;
      }
    }
  }

  handleNextQuestion() {
    this.saveQuestionAttempt();
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    this.updateSelectedAnswer();
  }

  handlePreviousQuestion() {
    this.saveQuestionAttempt();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex -= 1;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    this.updateSelectedAnswer();
  }

  handleSubmit() {
    this.saveQuestionAttempt();
    this.httpClient.post(`/api/assignments/attempts/submit-attempt`, {
      assignmentId: this.assignmentId,
    }, { observe: 'response' }).subscribe(response => {
      if (response.status >= 200 && response.status < 300) {
        this.router.navigate(["assignments", this.assignmentId, "overview"])
      }
    });
  }

  setQuestionIndex(index: number) {
    this.saveQuestionAttempt();
    this.currentQuestion = this.questions[index];
    this.currentQuestionIndex = index;
    this.updateSelectedAnswer();
  }

  // Function to trigger auto-save
  private triggerAutoSave() {
    this.autoSaveSubject.next();
  }


  onSelectAnswer($event: string | null) {
    this.selectedAnswer = $event;
    this.saveQuestionAttempt();
  }
}
