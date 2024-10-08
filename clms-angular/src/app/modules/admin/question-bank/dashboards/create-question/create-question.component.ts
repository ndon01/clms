import { Component } from '@angular/core';
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  answers: string[] = ['',  '', '', ''];
  keepAnswersOrdered: boolean = false;
  allowWorkUpload: boolean = false;
  required: boolean = false;
  image: string | null = null;

  addAnswer() {
    if (this.answers.length < 5) {
      this.answers.push('');
    }
  }

  handleImageUpload(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.image = null;
  }

  onAnswerChange(value: string, index: number) {
    this.answers[index] = value;
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
