export type ErrorType =
  | "bad-request-error"
  | "not-authorized-error"
  | "not-found-error"
  | "internal-server-error";

export type ErrorStatusCodeType = 400 | 401 | 404 | 500;

export const errorTypeWithCode = {
  "bad-request-error": 400,
  "not-authorized-error": 401,
  "not-found-error": 404,
  "internal-server-error": 500,
};

export interface ValidationErrorType {
  message: string;
  field?: string;
}
