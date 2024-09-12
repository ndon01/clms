import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {User} from "@core/model/User.model";
import {TableComponent} from "@core/components/table/table.component";
import {TableModule} from "primeng/table";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TagModule} from "primeng/tag";
import {InputIconModule} from "primeng/inputicon";
import {Button} from "primeng/button";

@Component({
  selector: 'admin-users-table-view',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  @Input() displayEditButton: boolean = false;
  @Output() editButtonClick: EventEmitter<User> = new EventEmitter<User>();

  EditButtonClicked(user: User) {
    this.editButtonClick.emit(user);
  }
}
