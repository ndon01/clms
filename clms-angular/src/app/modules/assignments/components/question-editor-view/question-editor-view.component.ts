import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {QuestionProjection} from "@modules/assignments/model/question.model";

@Component({
  selector: 'app-question-editor-view',
  standalone: true,
    imports: [
        Button,
        CheckboxModule,
        DropdownModule,
        FileUploadModule,
        InputTextModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './question-editor-view.component.html',
  styleUrl: './question-editor-view.component.css'
})
export class QuestionEditorViewComponent {
  @Input() question!: QuestionProjection;
}
