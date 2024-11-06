import {AssignmentProjection} from "@modules/assignments/model/assignment.model";
import {AssignmentAttemptProjection} from "@modules/assignments/model/assignment-attempt-answer.modal";

export type TutorGradebook = {
  allAssignments: AssignmentProjection[];
  allAttempts: AssignmentAttemptProjection[];
}
export type TutorGradebookProjection = Partial<TutorGradebook>;
