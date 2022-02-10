import request from "supertest";
import { createApp } from "../../test/setup";

export const signupRequest = (email: string, password: string) =>
  request(createApp()).post("/api/users/signup").send({
    email,
    password,
  });

it("returns a 201 on successful signup", async () => {
  await signupRequest("test@test.com", "password").expect(201);
});

it("returns a 400 on signup with invalid email", async () => {
  await signupRequest("test", "password").expect(400);
});

it("returns a 400 on signup with invalid password", async () => {
  await signupRequest("test", "pa").expect(400);
  await signupRequest(
    "test",
    "password12345678910123456789456132645897"
  ).expect(400);
});

it("returns a 400 on signup with no email or password", async () => {
  await signupRequest("", "pa").expect(400);
  await signupRequest("test@test.com", "").expect(400);
});

it("returns a 400 on signup with duplicate email", async () => {
  await signupRequest("test@test.com", "password").expect(201);
  await signupRequest("test@test.com", "password").expect(400);
});

it("sets cookie after successful signup", async () => {
  const response = await signupRequest("test@test.com", "password");
  expect(response.get("Set-Cookie")).toBeDefined();
});
