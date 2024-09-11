import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThemeService} from "@core/services/theme/theme.service";
import {NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {User} from "@core/model/User.model";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgIf,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() enableRadioButtons: boolean = false;
  @Input() radioSelection: User | null = null;
  @Output() radioSelectionChange: EventEmitter<User | null> = new EventEmitter<User | null>();


  @Input() enableCheckboxes: boolean = false;
  @Input() checkboxSelection: User[] = [];
  @Output() checkboxSelectionChange: EventEmitter<User[]> = new EventEmitter<User[]>();

}
