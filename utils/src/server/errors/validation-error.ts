import { CustomError } from "./custom-error";
import { ErrorType } from "../interface/errors-types";

export class ValidationError extends CustomError {
  constructor(public message: string, public errorType: ErrorType) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
