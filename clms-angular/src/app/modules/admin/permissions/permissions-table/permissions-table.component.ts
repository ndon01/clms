import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {User} from "@core/model/User.model";
import {TableComponent} from "@core/components/table/table.component";
import {TableModule} from "primeng/table";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TagModule} from "primeng/tag";
import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TableComponent,
    TableModule,
    FormsModule,
    TagModule
  ],
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.css'],
})
export class PermissionsTableComponent {
  @Input() permissions: Permission[] = [];

  @Input() enableRadioButtons: boolean = false;
  @Input() radioSelection: User | null = null;
  @Output() radioSelectionChange: EventEmitter<User | null> = new EventEmitter<User | null>();


  @Input() enableCheckboxes: boolean = false;
  @Input() checkboxSelection: User[] = [];
  @Output() checkboxSelectionChange: EventEmitter<User[]> = new EventEmitter<User[]>();

}
