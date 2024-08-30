export enum AuthenticationFlowType {
  DEFAULT = "DEFAULT"
}

export enum AuthenticationFlowState {
  NONE = "NONE",
}

export type IAuthenticationDTO = {
  authenticationFlowType: AuthenticationFlowType,
  authenticationFlowState: AuthenticationFlowState,
  authenticationFlowData: any
}

export type IAuthenticationProjection = {
  authenticationFlowType: AuthenticationFlowType,
  authenticationFlowState: String,
  authenticationFlowData: any
}

/*
  *DEFAULT* Authentication Flow

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
  * type IAuthenticationQuestionInternalState = {
  *   state: "None" | "Invalid" | "Valid"
  *   message: String
  * }
  *
  * type IRegisterPasswordQuestionInternalState {
  *
  * }
  *
  * {
  *   email_address: IAuthenticationQuestionInternalState,
  *   first_name: IAuthenticationQuestionInternalState,
  *   last_name: IAuthenticationQuestionInternalState,
  *   date_of_birth: IAuthenticationQuestionInternalState,
  *   password: IAuthenticationQuestionInternalState
  * }
 */
