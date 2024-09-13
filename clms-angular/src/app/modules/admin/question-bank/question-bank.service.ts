import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuestionBankQuestion} from "@modules/admin/question-bank/model/question-bank-question.model";
import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  constructor(private httpClient: HttpClient) { }
  getQuestions(){

    return this.httpClient.get<QuestionBankQuestion[]>("/api/questionBank/questions", {
      observe: 'body',
    })

  }

  getCategories() {
    return this.httpClient.get<QuestionBankCategory[]>("/api/questionBank/categories", {
      observe: 'body',
    })
  }


}

