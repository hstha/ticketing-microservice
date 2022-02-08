import { ResponseParam } from "../interface/Server-types";

abstract class Success {
  public abstract statusCode: number;
  constructor(public data: any) {}

  send(res: ResponseParam) {
    return res.status(this.statusCode).json({
      data: this.data,
      isSuccess: true,
    });
  }
}
