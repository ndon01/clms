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
  questionsLoaded = false;
  currentQuestion : QuestionProjection | null = null;
  courseId: number | undefined;
  course : CourseProjection | null = null;
  selectedAnswer: string | null = null;

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
      this.courseId = parseInt(id, 10);
    });
  }

  onSelectAnswer($event: string | null) {
    this.selectedAnswer = $event;
  }

  handleSubmit() {

  }
}
