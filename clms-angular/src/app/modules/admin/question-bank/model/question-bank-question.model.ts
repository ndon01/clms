import {QuestionBankCategory} from "@modules/admin/question-bank/model/question-bank-category.model";

export type QuestionBankQuestion= {
  id: number;
  questionName: string;
  categories: QuestionBankCategory[];
}





