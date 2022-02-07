import { CustomError } from "./custom-error";

export class DBConnectionError extends CustomError {
  public statusCode = 500;
  private reason = "Error connecting to db";
  constructor() {
    super("Error connecting to db");

    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  public serializeErrors() {
    return [{ message: this.reason }];
  }
}
