import { CustomError } from "./custom-error";
import { ErrorType, ValidationErrorType } from "../interface/errors-types";

export class RequestValidationError extends CustomError {
  errorType: ErrorType = "bad-request-error";
  constructor(public message: string, private errors: ValidationErrorType[]) {
    super(message);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.message,
      field: error.field,
    }));
  }

  static generateErrorMessage(data: ValidationErrorType[]) {
    return data.reduce((prev, current) => {
      return current.message + "\n" + prev;
    }, "");
  }

  static mapErrors(
    errors: any[],
    mappedKeys: { message: string; field?: string }
  ) {
    return errors.map((error) => ({
      message: error[mappedKeys.message],
      field: mappedKeys.field ? error[mappedKeys.field] : undefined,
    }));
  }
}
