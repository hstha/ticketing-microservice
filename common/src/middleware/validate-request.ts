import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "@h-stha/utils/build/server/errors";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const errors = validationResult(req);
  let errors = validationResult(req);
  const convertedMessage = RequestValidationError.mapErrors(errors.array(), {
    message: "msg",
    field: "field",
  });
  if (!errors.isEmpty()) {
    throw new RequestValidationError(
      "Request validation error",
      convertedMessage
    );
  }

  next();
};
