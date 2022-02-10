import express from "express";
import { SERVER_TYPE } from "./app-constant";
import { MethodType, RouteHandlerType } from "./interface/Server-types";

class Server {
  private _app: express.Application | undefined;
  private _router: express.Router | undefined;
  private static _instance: Server;

  private constructor() {}

  createApp() {
    this._app = express();
  }

  createRoute() {
    this._router = express.Router();
  }

  start(port: number, cb: () => void) {
    if (!this._app) {
      throw new Error(SERVER_TYPE["NO-APP"] || "Something went wrong");
    }
    this._app.listen(port, cb);
  }

  static getInstance(): Server {
    if (!Server._instance) {
      this._instance = new Server();
    }

    return this._instance;
  }

  use(cb: Function) {
    if (!this._app) {
      throw new Error(SERVER_TYPE["NO-APP"] || "Something went wrong");
    }
    this._app.use(cb());
  }

  set<T>(name: string, value: T) {
    if (!this._app) {
      throw new Error(SERVER_TYPE["NO-APP"] || "Something went wrong");
    }
    this._app.set(name, value);
  }

  getApp() {
    return this._app;
  }

  getRouter() {
    return this._router;
  }

  requestApp(
    url: string,
    method: MethodType,
    ...handler: RouteHandlerType[] | Array<any>
  ) {
    if (!this._app) {
      throw new Error(SERVER_TYPE["NO-APP"] || "Something went wrong");
    }
    this._app[method](url, handler);
  }

  requestRoute(
    url: string,
    method: MethodType,
    ...handler: RouteHandlerType[] | Array<any>
  ) {
    if (!this._router) {
      throw new Error(SERVER_TYPE["NO-ROUTE"] || "Something went wrong");
    }

    this._router[method](url, handler);
  }
}

export default Server;
