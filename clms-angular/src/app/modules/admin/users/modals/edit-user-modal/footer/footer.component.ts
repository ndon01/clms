import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'modal-update-button-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig<User>, private http: HttpClient) {

  }

  onClickUpdate() {
    this.ref.close(this.config.data);
  }


}
