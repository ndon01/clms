export type Answer = {
  text: string;
  isCorrect: boolean;
  id: string;
  order: number;
}

export type AnswerProjection = Partial<Answer>;

export type Question = {
  id: number;
  assignmentId: number;
  title: string;
  question: string;
  questionType: 'single-choice' | 'multiple-choice';
  answers: AnswerProjection[];
  keepAnswersOrdered: boolean;
  order: number;
}

export type QuestionProjection = Partial<Question>;
