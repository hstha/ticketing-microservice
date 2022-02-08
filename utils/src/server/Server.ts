import express from "express";
import {
  MethodType,
  NextFunctionParam,
  RequestParam,
  ResponseParam,
} from "./interface/Server-types";

type RouteHandlerType = (
  req: RequestParam,
  res: ResponseParam,
  next: NextFunctionParam
) => any;

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
    this._router;
  }

  start(port: number, cb: () => void) {
    this._app!.listen(port, cb);
  }

  static getInstance(): Server {
    if (!Server._instance) {
      this._instance = new Server();
    }

    return this._instance;
  }

  use(cb: Function) {
    this._app!.use(cb());
  }

  set<T>(name: string, value: T) {
    this._app!.set(name, value);
  }

  getRouter() {
    return this._router;
  }

  requestApp(url: string, method: MethodType, ...handler: RouteHandlerType[]) {
    this._app![method](url, handler);
  }

  requestRoute(
    url: string,
    method: MethodType,
    ...handler: RouteHandlerType[]
  ) {
    this._router![method](url, handler);
  }
}

export default Server;
