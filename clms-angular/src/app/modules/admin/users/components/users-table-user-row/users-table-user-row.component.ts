import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "@core/model/User.model";
import {TagModule} from "primeng/tag";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: '[app-users-table-user-row]',
  templateUrl: './users-table-user-row.component.html',
  styleUrl: './users-table-user-row.component.css'
})
export class UsersTableUserRowComponent {
  @Input() user: User = {
    id: -1,
    username: "",
    roles: [],
    permissions: [],
    password: ""
  };
  @Output() userChange: EventEmitter<User> = new EventEmitter<User>();

  @Input() displayEditButton: boolean = false;
  @Output() editButtonClick: EventEmitter<User> = new EventEmitter<User>();

  EditButtonClicked(user: User) {
    this.editButtonClick.emit(user);
  }
}
