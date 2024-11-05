import {UserProjection} from "@core/model/User.model";
import {AssignmentProjection} from "@modules/assignments/model/assignment.model";

export type AssignmentAttemptAnswer = {
  questionId: number;
  selectedAnswerId: string;
  selectedAnswerCorrect?: boolean; // Optional for tracking correctness
};

export type AssignmentAttemptAnswerProjection = Partial<AssignmentAttemptAnswer>;

export type AssignmentAttempt = {
  id: string;
  assignment: AssignmentProjection
  user: UserProjection;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED' | 'PAST_DUE';
  startedAt: string;
  answers: AssignmentAttemptAnswerProjection[]; // Array of answers for the attempt
  scorePercentage?: number; // Optional score percentage if available
  answersCorrect?: number; // Optional count of correct answers if tracked
  submittedAt?: string; // Optional date of submission
};

export type AssignmentAttemptProjection = Partial<AssignmentAttempt>;

