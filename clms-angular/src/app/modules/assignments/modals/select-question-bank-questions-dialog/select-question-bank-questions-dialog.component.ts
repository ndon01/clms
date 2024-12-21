import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {CourseModuleProjection, QuestionBankCategory, QuestionBankQuestionProjection} from "@core/modules/openapi";
import { TreeNode } from "primeng/api";
import { TableModule } from "primeng/table";
import { ButtonDirective } from "primeng/button";
import {Tree, TreeModule} from "primeng/tree";
import {NgIf} from "@angular/common";
import {Question} from "@modules/assignments/model/question.model";
import {
  QuestionBankQuestionsTableComponent
} from "@modules/question-bank/components/question-bank-questions-table/question-bank-questions-table.component";

export interface SelectQuestionBankQuestionsDialogData {
  questionBankQuestions: QuestionBankQuestionProjection[];
  multiple: boolean;
  selectedQuestionBankQuestions: QuestionBankQuestionProjection[];
  noneSelectedAllowed: boolean;
}

@Component({
  selector: 'app-select-question-bank-questions-dialog',
  templateUrl: './select-question-bank-questions-dialog.component.html',
  imports: [
    TableModule,
    ButtonDirective,
    TreeModule,
    NgIf,
    QuestionBankQuestionsTableComponent
  ],
  standalone: true
})
export class SelectQuestionBankQuestionsDialogComponent implements OnInit {
  multiple = false;
  noneSelectedAllowed = false;

  questionBankQuestions: QuestionBankQuestionProjection[] = [];
  selectedQuestionBankQuestions: QuestionBankQuestionProjection[] | QuestionBankQuestionProjection = [];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig<SelectQuestionBankQuestionsDialogData>) {
    if (config.data) {
      this.multiple = config.data.multiple || false;
      this.noneSelectedAllowed = config.data.noneSelectedAllowed || false;

      this.questionBankQuestions = config.data.questionBankQuestions || [];
      this.selectedQuestionBankQuestions = config.data.selectedQuestionBankQuestions || [];
    }
  }

  ngOnInit() {
    // Build the category tree structure for display
  }

  // Convert the list of categories to a tree structure

  // Confirm and emit selected categories, then close the dialog
  confirmSelection() {
    if (!this.selectedQuestionBankQuestions) {
      this.ref.close(null);
    }
    this.ref.close(this.selectedQuestionBankQuestions);
  }

  // Close the dialog without any selection
  cancel() {
    this.ref.close();
  }

  protected readonly Array = Array;

  getContinueButtonText(): string {
    const selectedCount = Array.isArray(this.selectedQuestionBankQuestions) ? this.selectedQuestionBankQuestions.length : 1;

    if (selectedCount === 0 && this.noneSelectedAllowed) {
      return 'Select None';
    } else if (selectedCount <= 1) {
      return 'Select Question';
    } else {
      return `Select Questions (${selectedCount})`;
    }
  }

  getContinueButtonDisabled(): boolean {
    if (this.noneSelectedAllowed) {
      return false; // Button is never disabled if noneSelectedAllowed is true
    }

    if (Array.isArray(this.selectedQuestionBankQuestions)) {
      return this.selectedQuestionBankQuestions.length === 0; // Disabled if no category is selected
    }

    return !this.selectedQuestionBankQuestions; // Disabled if no single category is selected
  }

}
