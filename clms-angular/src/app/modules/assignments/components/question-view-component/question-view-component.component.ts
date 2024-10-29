import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question, QuestionProjection} from "@modules/assignments/model/question.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {EditorModule} from "primeng/editor";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'assignments-question-view-component',
  standalone: true,
  imports: [
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    EditorModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './question-view-component.component.html',
  styleUrl: './question-view-component.component.css'
})
export class QuestionViewComponentComponent {
  @Input() question: QuestionProjection | null = null;
  @Input() selectedAnswer: string | null = null;
  @Output() selectedAnswerChange = new EventEmitter<string | null>();
  @Input() isReadOnly = false;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || '');
  }

  handleAnswerSelect(value: string | undefined) {
    if (!this.isReadOnly) {
      this.selectedAnswer = value || null;
      this.selectedAnswerChange.emit(this.selectedAnswer);
    }
  }
}
