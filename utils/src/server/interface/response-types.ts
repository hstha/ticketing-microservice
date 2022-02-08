export type SuccessType = "created" | "updated" | "ok" | "no-content";

export type StatusCodeType = 200 | 201 | 204;

export const successTypeWithCode = {
  created: 201,
  ok: 200,
  updated: 404,
  "no-content": 201,
};
