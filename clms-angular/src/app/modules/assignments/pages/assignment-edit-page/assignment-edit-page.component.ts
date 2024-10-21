import {assertInInjectionContext, Component, OnInit} from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'assignment-edit-page',
  templateUrl: './assignment-edit-page.component.html',
  styleUrl: './assignment-edit-page.component.css'
})
export class AssignmentEditPageComponent implements OnInit {
  assignmentId!: number;
  assignment!: AssignmentProjection;

  constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.assignmentId = parseInt(id, 10);
      this.fetchAssignment();
      this.resetAddQuestionModal();
    });
  }

  fetchAssignment() {
    this.httpClient.get<AssignmentProjection>(`/api/assignments/${this.assignmentId}`).subscribe(assignment => {
      this.assignment = assignment;
      this.assignment.startDate = assignment.startDate ? new Date(assignment.startDate) : null;
      this.assignment.dueDate= assignment.dueDate? new Date(assignment.dueDate) : null;
      this.sortQuestionsByOrder();
      console.log("Assignment after fetching", this.assignment);
    });
  }

  // Sort the questions by the 'order' field
  sortQuestionsByOrder() {
    if (this.assignment.questions) {
      this.assignment.questions.sort((a: QuestionProjection, b: QuestionProjection) => {
        if (a.order && b.order) {
          return a.order - b.order;
        }
        return 0;
      });
    }
  }

  onQuestionsReordered(event: any) {
    if (!this.assignment.questions) return;
    // Update the order of the questions based on their new index
    this.assignment.questions.forEach((question: QuestionProjection, index: number) => {
      question.order = index + 1; // Start order from 1
    });

    // Sort the questions by their new order before displaying them
    this.sortQuestionsByOrder();
  }

  bulkUpdateQuestions(questions: QuestionProjection[]) {
    const url = '/api/assignment-questions/bulk-update';
    this.httpClient.post(url, questions).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Questions updated successfully.'})
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while updating the questions.'})
      }
    ).add(() => {
      this.fetchAssignment();
    });
  }

  selectQuestion(q: QuestionProjection) {
    this.selectedQuestion = q;
    this.openEditQuestionModal()
  }
  selectDeleteQuestion(q: QuestionProjection) {
    this.selectedQuestion = q;
    this.deleteQuestion();
  }

  // Edit question modal

  isEditQuesitonModalVisible = false;
  selectedQuestion!: QuestionProjection;

  openEditQuestionModal() {
    this.isEditQuesitonModalVisible = true;
  }

  closeEditQuestionModal() {
    this.isEditQuesitonModalVisible = false;
  }

  cancelEditQuestionModal() {
    this.closeEditQuestionModal();
  }
  saveAssignment(assignment : AssignmentProjection){
    if (this.assignment.questions) {
      this.bulkUpdateQuestions(this.assignment.questions);
    }

    const url = `/api/assignments/${this.assignment.id}`;
    this.httpClient.put(url, this.assignment).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Assignment updated successfully.'})
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while updating the assignment.'})
      }
    ).add(() => {
      this.fetchAssignment();
    });
  }


  saveEditQuestionModal() {
    const url = `/api/assignment-questions/${this.selectedQuestion.id}`;
    this.selectedQuestion.assignmentId = this.assignment.id;
    console.log('selected question assignment id', this.selectedQuestion.assignmentId)
    this.httpClient.put(url,this.selectedQuestion).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Question updated successfully.'})
      },
      error => {
        console.error('Error Details',error)
        console.log('selected question',this.selectedQuestion)
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while updating the question.'})
      }
    ).add(() => {
      this.fetchAssignment();
      this.closeEditQuestionModal();
    });
  }
  deleteQuestion() {
    const url = `/api/assignment-questions/${this.selectedQuestion.id}`;
    this.httpClient.delete(url).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Question deleted successfully.'})
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the question.'})
      }
    ).add(() => {
      this.fetchAssignment();
      this.closeEditQuestionModal();
    });
  }

  // Add question modal

  isAddQuestionModalVisible = false;
  newQuestion: QuestionProjection = {};

  openAddQuestionModal() {
    this.resetAddQuestionModal();
    this.isAddQuestionModalVisible = true;
  }

  closeAddQuestionModal() {
    this.isAddQuestionModalVisible = false;
  }

  cancelAddQuestionModal() {
    this.closeAddQuestionModal();
    this.resetAddQuestionModal();
  }

  saveAddQuestionModal() {
    // Make sure the newQuestion object is valid before sending the request.
    if (!this.newQuestion.question || this.newQuestion.question.trim() === '') {
      alert('Question text is required.');
      return;
    }


    // Example URL for the endpoint
    const url = '/api/assignment-questions';
    // Send the POST request
    this.httpClient.post<QuestionProjection>(url, this.newQuestion).subscribe(
      response => {
        // Close the modal and reset the form
        this.closeAddQuestionModal();
        this.resetAddQuestionModal();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Question saved successfully.'})
        },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while saving the question.'})
      }
    ).add(() => {
      // Do something after the request is complete.
      this.fetchAssignment();
    });
  }


  resetAddQuestionModal() {
    this.newQuestion = {
      id: 0,
      assignmentId: this.assignment.id,
      question: '',
      answers: [],
      questionType: 'single-choice',
      keepAnswersOrdered: false,
    }
  }

  parseHtmlForFiles(html: string): string[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll('img')).map(img => img.src);
  }

  goBack() {
    this.location.back();
  }
}
