import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";

import Quill from 'quill'

import ImageResize from 'quill-image-resize-module--fix-imports-error';
import {QuillModules} from "ngx-quill";
import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
import {HttpClient} from "@angular/common/http";

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageHandler', ImageHandler);
@Component({
  selector: 'app-question-quill-editor',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule
  ],
  templateUrl: './question-quill-editor.component.html',
  styleUrl: './question-quill-editor.component.css'
})
export class QuestionQuillEditorComponent {
  @Input() assignmentId: number | undefined = undefined;
  @Input() text: string | undefined = undefined;
  @Output() textChange = new EventEmitter<string | undefined>();
  @Input() modules: QuillModules | undefined = undefined;
  constructor(private httpClient: HttpClient) {
    if (this.modules === undefined) {
      this.modules = {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }]
        ],
        imageResize: {
          displaySize: true
        },
        imageHandler: {
          upload: (file) => {
            if (!this.assignmentId) {
              throw new Error('Question ID is not set');
            }

            return new Promise((resolve, reject) => {

              const formData = new FormData();
              formData.append('file', file);

              this.httpClient.post(`/api/assignments/${this.assignmentId}/files`,formData,{
                observe: 'response',
              }).subscribe(data => {
                let location = data.headers.get('location');
                if (data.status >= 200 && data.status < 300) {
                  console.log(location);
                  resolve(location || '');
                } else {
                  reject(location || '');
                }
              });
            })
          },
          accepts: ['png', 'jpg', 'jpeg', 'jfif'] // Extensions to allow for images (Optional) | Default - ['jpg', 'jpeg', 'png']
        } as Options,
      }
    }
  }

}
