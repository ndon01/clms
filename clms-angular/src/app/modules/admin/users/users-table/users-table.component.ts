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

  @Input() enableRadioButtons: boolean = false;
  @Input() radioSelection: User | null = null;
  @Output() radioSelectionChange: EventEmitter<User | null> = new EventEmitter<User | null>();


  @Input() enableCheckboxes: boolean = false;
  @Input() checkboxSelection: User[] = [];
  @Output() checkboxSelectionChange: EventEmitter<User[]> = new EventEmitter<User[]>();

}
