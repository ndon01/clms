export enum RegistrationFlowType {
  DEFAULT = "DEFAULT"
}

export enum RegistrationFlowState {
  NONE = "NONE",
}

export type IRegistrationDTO = {
  registrationFlowType: RegistrationFlowType,
  registrationFlowState: RegistrationFlowState,
  registrationFlowData: any
}

export type IRegistrationProjection = {
  registrationFlowType: RegistrationFlowType,
  registrationFlowState: String,
  registrationFlowData: any
}

/*
  *DEFAULT* Registration Flow

  1) Request email address, first name, last name, date of birth, password
  *
  * {
  *   email_address: String,
  *   first_name: String,
  *   last_name: String,
  *   date_of_birth: String,
  *   password: String
  * }
  *
  2) Response with
  *
  * type IRegistrationQuestionInternalState = {
  *   state: "None" | "Invalid" | "Valid"
  *   message: String
  * }
  *
  * type IRegisterPasswordQuestionInternalState {
  *
  * }
  *
  * {
  *   email_address: IRegistrationQuestionInternalState,
  *   first_name: IRegistrationQuestionInternalState,
  *   last_name: IRegistrationQuestionInternalState,
  *   date_of_birth: IRegistrationQuestionInternalState,
  *   password: IRegistrationQuestionInternalState
  * }
 */
