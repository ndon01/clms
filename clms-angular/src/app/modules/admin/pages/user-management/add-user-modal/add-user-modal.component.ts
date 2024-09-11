import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonComponent} from "@core/components/button/button.component";
import {UsersTableComponent} from "@modules/admin/pages/user-management/users-table/users-table.component";
import {PaginatorModule} from "primeng/paginator";
import {PasswordInputFieldComponent} from "@shared/ui/password-input-field/password-input-field.component";

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [
    CardModule,
    ButtonComponent,
    UsersTableComponent,
    PaginatorModule,
    PasswordInputFieldComponent
  ],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent {

}
