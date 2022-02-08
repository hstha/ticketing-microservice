import { ValidationErrorType } from ".";
import { stringify } from "../..";
import { ResponseParam } from "../interface/Server-types";
import { errorTypeWithCode } from "../interface/errors-types";
import { ErrorType } from "../interface/errors-types";

export abstract class CustomError extends Error {
  abstract errorType: ErrorType | undefined;

  constructor(message: string | ValidationErrorType[]) {
    super(stringify(message));

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];

  getErrorStatusCode() {
    return errorTypeWithCode[this.errorType!];
  }

  send(res: ResponseParam) {
    const status = this.errorType ? this.getErrorStatusCode() : 500;
    const message = this.errorType
      ? this.serializeErrors()
      : [{ message: "Something went wrong" }];
    return res.status(status).json({
      data: message,
      isSuccess: false,
    });
  }
}
