import {
  NextFunctionParam,
  RequestParam,
  ResponseParam,
} from "@h-stha/utils/build/server/interface/Server-types";
import { ValidationError } from "@h-stha/utils/build/server/errors";

export const requireAuth = (
  req: RequestParam,
  res: ResponseParam,
  next: NextFunctionParam
) => {
  if (!req.currentUser) {
    throw new ValidationError("Not Authorized", "not-authorized-error");
  }

  next();
};
