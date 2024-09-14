import {Component, Input, OnInit, Output} from '@angular/core';
import {AdminModule} from "@modules/admin/admin.module";
import {NgForOf, NgIf} from "@angular/common";
import {FilterMatchMode, FilterService, PrimeTemplate, SelectItem} from "primeng/api";
import {TableModule} from "primeng/table";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-question-bank-question-table',
  templateUrl: './question-bank-question-table.component.html',
  styleUrl: './question-bank-question-table.component.css'
})
export class QuestionBankQuestionTableComponent implements OnInit{
  @Input() questions: QuestionBankQuestion[] = [];
  @Input() useCheckBoxes: boolean = true;
  @Input() checkBoxValues: QuestionBankQuestion[] = [];
  @Output() checkBoxValuesChange: QuestionBankQuestion[] = [];
  matchModeOptions: SelectItem[] | undefined;

  constructor(private filterService: FilterService){}
  ngOnInit(){
    const customFilterName = 'custom-category';
    this.filterService.register(customFilterName, (value:any, filter:any): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.lowercase().toString() === filter.lowercase().toString();
    }
    )
    this.matchModeOptions = [
      { label: 'Custom Equals', value: customFilterName },
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
    ];
  }
  onCheckBoxClick(question: QuestionBankQuestion) {
    if (this.checkBoxValues.includes(question)) {
      this.checkBoxValues = this.checkBoxValues.filter(q => q !== question);
    } else {
      this.checkBoxValues.push(question);
    }
    this.checkBoxValuesChange = this.checkBoxValues;
  }


}
