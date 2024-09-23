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
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  onRowEditInit(user: User) {
    console.log(user)
  }

  onRowEditSave(user: User) {
    console.log(user)
  }

  onRowEditCancel(user: User, index: number) {
    console.log(user, index)
  }
}
