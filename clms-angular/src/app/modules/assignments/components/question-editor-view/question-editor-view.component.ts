import {Component, Input, OnInit} from '@angular/core';
import {AnswerProjection, QuestionProjection} from "@modules/assignments/model/question.model";

@Component({
  selector: 'app-question-editor-view',
  templateUrl: './question-editor-view.component.html',
  styleUrl: './question-editor-view.component.css'
})
export class QuestionEditorViewComponent implements OnInit{
  answers: AnswerProjection[] = [{text: "Answer 1", isCorrect: false}, {text: "Answer 1", isCorrect: false}, {text: "Answer 1", isCorrect: false}, {text: "Answer 1", isCorrect: false}];

  testInput: QuestionProjection = {
    id: 0,
    question: "",
    questionType: 'single-choice',
    answers: this.answers,
    keepAnswersOrder: false,
    allowWorkUpload: false,
    required: false
  }

  @Input() assignmentId: number | undefined = undefined;

  @Input() question : QuestionProjection = {
    id: 0,
    question: "",
    questionType: 'single-choice',
    answers: this.answers,
    keepAnswersOrder: false,
    allowWorkUpload: false,
    required: false
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  addAnswer() {
    if (!this.question) return;
    if (!this.question.answers) this.question.answers = [];
    this.question.answers = [...this.question.answers, {text: "", isCorrect: false}];
  }

  removeAnswer(index: number) {
    if (!this.question) return;
    if (!this.question.answers) this.question.answers = [];
    this.question.answers = this.question.answers.filter((_, i) => i !== index);
  }

  textExists(question: string | undefined) {
    return question && question.length >= 0 ? true : false;
  }

  protected readonly undefined = undefined;
}
