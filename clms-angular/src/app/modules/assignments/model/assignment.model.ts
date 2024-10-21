import {QuestionProjection} from "@modules/assignments/model/question.model";

export type Assignment = {
  id: number;
  name: string;
  description: string;
  questions: QuestionProjection[];
  startDate: Date | null;
  dueDate: Date | null;
  maxAttempts:number;
  timeLimitMinutes: number;
}

export type AssignmentProjection = Partial<Assignment>
