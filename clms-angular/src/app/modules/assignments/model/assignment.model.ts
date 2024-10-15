import {QuestionProjection} from "@modules/assignments/model/question.model";

export type Assignment = {
  id: number;
  name: string;
  description: string;
  questions: QuestionProjection[];
  startDate: Date;
  dueDate: Date;
}

export type AssignmentProjection = Partial<Assignment>
