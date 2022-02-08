import { Request, Response, NextFunction } from "express";

export type MethodType =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";
export interface RequestParam extends Request {}
export interface ResponseParam extends Response {}
export interface NextFunctionParam extends NextFunction {}

export type RouteHandlerType = (
  req: RequestParam,
  res: ResponseParam,
  next: NextFunctionParam
) => any;
