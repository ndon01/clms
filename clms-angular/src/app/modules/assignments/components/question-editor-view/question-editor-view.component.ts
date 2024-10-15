import {Component, Input, OnInit} from '@angular/core';
import {AnswerProjection, QuestionProjection} from "@modules/assignments/model/question.model";

import Quill from 'quill'

import ImageResize from 'quill-image-resize-module--fix-imports-error';
Quill.register('modules/imageResize', ImageResize)

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


  @Input() question : QuestionProjection = {
    id: 0,
    question: "",
    questionType: 'single-choice',
    answers: this.answers,
    keepAnswersOrder: false,
    allowWorkUpload: false,
    required: false
  };

  modules!: any;
  constructor() {
    this.modules = {
      imageResize: {},
      toolbar: [['image']]
    }
  }
  addBindingCreated(quill) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  ngOnInit(): void {
  }
}
