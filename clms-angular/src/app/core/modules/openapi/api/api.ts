export * from './admin.service';
import { AdminService } from './admin.service';
export * from './admin.serviceInterface';
export * from './assignments.service';
import { AssignmentsService } from './assignments.service';
export * from './assignments.serviceInterface';
export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './authentication.serviceInterface';
export * from './authorization.service';
import { AuthorizationService } from './authorization.service';
export * from './authorization.serviceInterface';
export * from './course.service';
import { CourseService } from './course.service';
export * from './course.serviceInterface';
export * from './question-bank.service';
import { QuestionBankService } from './question-bank.service';
export * from './question-bank.serviceInterface';
export * from './questions.service';
import { QuestionsService } from './questions.service';
export * from './questions.serviceInterface';
export * from './users.service';
import { UsersService } from './users.service';
export * from './users.serviceInterface';
export const APIS = [AdminService, AssignmentsService, AuthenticationService, AuthorizationService, CourseService, QuestionBankService, QuestionsService, UsersService];
