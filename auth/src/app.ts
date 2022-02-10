import { json } from "body-parser";
import cookieSession from "cookie-session";
import { ValidationError, errorHandler, Server } from "@h-stha/utils";
import { Router } from "./routes";

export class App {
  private _app: Server;

  constructor() {
    this._app = Server.getInstance();
    this._app.createApp();
    this._app.set("trust proxy", true);
    this.addMiddleware();
    this.addRoutes();
    this.addErrorHandling();
  }

  getApp() {
    return this._app.getApp();
  }

  private addMiddleware() {
    this._app.use(() => json());
    this._app.use(() =>
      cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
      })
    );
  }

  private addRoutes() {
    this._app.use(() => new Router().getRouter());
    this._app.requestApp("*", "get", (req, res, next) => {
      next(new ValidationError("Path not found", "not-found-error"));
    });
  }

  private addErrorHandling() {
    this._app.use(() => errorHandler);
  }
}

// const app = express();
// app.set("trust proxy", true);
// app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== "test",
//   })
// );

// app.use(currentUserRouter);
// app.use(signIn);
// app.use(signOut);
// app.use(signUp);

// app.get("*", async (req, res, next) => {
//   next(new ValidationError("Path not found", "not-found-error"));
// });

// app.use(errorHandler);

// export { app };
