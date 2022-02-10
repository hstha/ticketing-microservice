// import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  Server,
  NextFunctionParam,
  RequestParam,
  ResponseParam,
  ValidationError,
} from "@h-stha/utils";
import { currentUser } from "@hstha-ticketing/common";
import { TicketRoutes } from "./routes";

const server = Server.getInstance();
server.createApp();
server.set("trust proxy", true);
server.use(() => json());
server.use(() =>
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
server.use(() => currentUser);
server.use(() => new TicketRoutes().getRoute());
server.requestApp(
  "*",
  "get",
  (req: RequestParam, res: ResponseParam, next: NextFunctionParam) => {
    next(new ValidationError("Path not found", "not-found-error"));
  }
);
server.use(() => errorHandler);

export const app = server.getApp()!;

// const app = express();
// app.set("trust proxy", true);
// app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== "test",
//   })
// );
// app.use(currentUser);

// app.use(newTicket);

// app.get("*", async (req, res, next) => {
//   next(new NotFoundError("Path not found"));
// });

// app.use(errorHandler);

// export { app };
