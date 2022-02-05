import request from "supertest";
import { app } from "../../app";
import { signupRequest } from "./signup.test";

const signinRequest = (email: string, password: string) =>
  request(app).post("/api/users/signin").send({
    email,
    password,
  });

it("fails when a email that does not exist is supplied", async () => {
  await signinRequest("test@test.com", "password").expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await signupRequest("test@test.com", "password").expect(201);
  await signinRequest("test@test.com", "dfsdfsdfsdfsdf").expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await signupRequest("test@test.com", "password").expect(201);
  const response = await signinRequest("test@test.com", "password").expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
