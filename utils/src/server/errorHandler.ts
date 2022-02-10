import { CustomError } from "./errors/custom-error";
import {
  NextFunctionParam,
  RequestParam,
  ResponseParam,
} from "./interface/Server-types";

export const errorHandler = (
  err: Error,
  req: RequestParam,
  res: ResponseParam,
  next: NextFunctionParam
) => {
  if (err instanceof CustomError) {
    return err.send(res);
  }

  return res.status(500).json({
    errors: [{ message: "Something went wrong" }],
  });
};
