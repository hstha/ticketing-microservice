import request from "supertest";
import { createApp } from "../../test/setup";
import { signupRequest } from "./signup.test";

export const signoutRequest = () =>
  request(createApp()).post("/api/users/signout").send({});

it("clears the cookie after signing out", async () => {
  await signupRequest("test@test.com", "password").expect(201);

  const response = await signoutRequest().expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
