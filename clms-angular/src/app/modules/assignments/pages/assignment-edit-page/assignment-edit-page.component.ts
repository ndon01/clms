import {Component, OnInit} from '@angular/core';
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {QuestionProjection} from "@modules/assignments/model/question.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'assignment-edit-page',
  templateUrl: './assignment-edit-page.component.html',
  styleUrl: './assignment-edit-page.component.css'
})
export class AssignmentEditPageComponent implements OnInit {
  assignment!: AssignmentProjection;

  constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.httpClient.get<AssignmentProjection>(`/api/assignments/${id}`).subscribe(assignment => {
        this.assignment = assignment;
      });
    });
  }

  selectQuestion(q: QuestionProjection) {
    this.selectedQuestion = q;
    this.openEditQuestionModal()
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

  saveEditQuestionModal() {
    this.closeEditQuestionModal();
  }

  // Add question modal

  isAddQuestionModalVisible = false;
  newQuestion: QuestionProjection = {
    id: 0,
    question: ''
  };

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
        this.assignment.questions = this.assignment.questions || [];
        this.assignment.questions.push(response);

        // Close the modal and reset the form
        this.closeAddQuestionModal();
        this.resetAddQuestionModal();

        alert('Question added successfully.');
      },
      error => {
        console.error('Error adding question:', error);
        alert('Failed to add the question. Please try again.');
      }
    );
  }


  resetAddQuestionModal() {
    this.newQuestion = {
      id: 0,
      assignmentId: this.assignment.id,
      question: '',
      answers: [{
        text: "",
        isCorrect: false
      }, {
        text: "",
        isCorrect: false
      }, {
        text: "",
        isCorrect: false
      }, {
        text: "",
        isCorrect: false
      }],
      questionType: 'single-choice',
    }
  }

  goBack() {
    this.location.back();
  }
}
