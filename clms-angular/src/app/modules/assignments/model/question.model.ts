export type Answer = {
  text: string;
  isCorrect: boolean;
}

export type AnswerProjection = Partial<Answer>;

export type Question = {
  id: number;
  question: string;
  questionType: 'single-choice' | 'multiple-choice';
  answers: AnswerProjection[];
}

export type QuestionProjection = Partial<Question>;
