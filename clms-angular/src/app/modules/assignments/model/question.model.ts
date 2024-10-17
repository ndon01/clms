export type Answer = {
  text: string;
  isCorrect: boolean;
}

export type AnswerProjection = Partial<Answer>;

export type Question = {
  id: number;
  assignmentId: number;
  title: string;
  question: string;
  questionType: 'single-choice' | 'multiple-choice';
  answers: AnswerProjection[];
  keepAnswersOrder: boolean;
  allowWorkUpload: boolean;
  required: boolean;

}

export type QuestionProjection = Partial<Question>;
