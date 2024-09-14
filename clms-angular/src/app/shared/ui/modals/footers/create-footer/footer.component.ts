import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'modal-create-button-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class CreateButtonFooter {
  onClick(){
    this.ref.close(this.config.data);
  }

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig<any>, private http: HttpClient) {
  }


}
