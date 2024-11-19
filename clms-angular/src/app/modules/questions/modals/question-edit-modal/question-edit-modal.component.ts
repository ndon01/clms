import { Component } from '@angular/core';
import {AssignmentsModule} from "@modules/assignments/assignments.module";
import {ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AssignmentQuestion} from "@core/modules/openapi";
import {
  QuestionEditorViewComponent
} from "@modules/assignments/components/question-editor-view/question-editor-view.component";

export interface QuestionEditModalConfigData {
  question: AssignmentQuestion
}

@Component({
  selector: 'app-question-edit-modal',
  standalone: true,
  imports: [
    AssignmentsModule,
    ButtonDirective,
    DialogModule,
    PrimeTemplate,
    QuestionEditorViewComponent
  ],
  templateUrl: './question-edit-modal.component.html',
  styleUrl: './question-edit-modal.component.css'
})
export class QuestionEditModalComponent {

  selectedQuestion?: AssignmentQuestion;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig<QuestionEditModalConfigData>,
  ) {
    if (!this.config.data) {
      throw new Error("Must provide a question")
    }
    this.selectedQuestion = structuredClone(this.config.data.question)
  }

  cancelEditQuestionModal() {
    this.ref.close(null);
  }

  saveEditQuestionModal() {
    this.ref.close(this.selectedQuestion);
  }

}
