import { MongoMemoryServer } from "mongodb-memory-server";
import mongooes from "mongoose";
import request from "supertest";
import { App } from "../app";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "testkey";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongooes.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongooes.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongooes.connection.close();
});

export function createApp() {
  return new App().getApp();
}

export const signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(createApp())
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
