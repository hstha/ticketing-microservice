import { CustomError } from ".";

export class NotFound extends CustomError {
  statusCode = 404;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
