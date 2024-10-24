import { Component, Input, OnInit } from '@angular/core';
import { AnswerProjection, QuestionProjection } from "@modules/assignments/model/question.model";

@Component({
  selector: 'app-question-editor-view',
  templateUrl: './question-editor-view.component.html',
  styleUrls: ['./question-editor-view.component.css']
})
export class QuestionEditorViewComponent implements OnInit {

  // Default answers with the 'order' field
  @Input() question: QuestionProjection | undefined = undefined;

  @Input() assignmentId: number | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
    // Initialize default ordering for the answers if they exist
    if (this.question?.answers) {
      this.updateAnswerOrder();
    }
  }

  // Add a new answer to the question's answers array and assign the correct order
  addAnswer(): void {
    if (!this.question || !this.question.answers) return;
    const newOrder = this.question.answers.length + 1;
    this.question.answers = [...this.question.answers, { text: "", isCorrect: false, order: newOrder }];
  }

  // Remove an answer based on its index and re-assign the correct order
  removeAnswer(index: number): void {
    if (!this.question || !this.question.answers || this.question.answers.length <= index) return;
    this.question.answers = this.question.answers.filter((_, i) => i !== index);
    this.updateAnswerOrder(); // Update order after removal
  }

  // Handle reorder event from p-orderList
  updateAnswerOrder(event?: any): void {
    // Reorder the answers' `order` field based on their current position
    if (this.question && this.question.answers) {
      this.question.answers.forEach((answer: any, index: number) => {
        answer.order = index + 1; // Set the order based on the current index
      });
    }
  }
}
