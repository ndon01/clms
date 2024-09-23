import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "@core/model/User.model";
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";
import {BehaviorSubject} from "rxjs";
import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'admin-create-user-modal',
  templateUrl: './create-user-modal.component.html',
})
export class CreateUserModalComponent implements OnInit {
  @Input() enabled: boolean = false;
  @Output() enabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // STATE
  isUserCreated: boolean = false;

  // USER
  username: string = "";
  password: string = "";

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  save() {
    this.isUserCreated = true;
    this.httpClient.post('/api/admin/users/createUser', {
      username: this.username,
      password: this.password
    }).subscribe(() => {
      this.enabledChange.emit(false);
    })
  }

}
