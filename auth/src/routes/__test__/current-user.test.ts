import request from "supertest";
import { createApp, signin } from "../../test/setup";

it("responds with details about the current user", async () => {
  const cookie = await signin();

  const response = await request(createApp())
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(createApp())
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
