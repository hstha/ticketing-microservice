import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter, signIn, signOut, signUp } from "./routes";
// use as npm package
import { errorHandler, NotFound } from "../../common/src";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signIn);
app.use(signOut);
app.use(signUp);

app.get("*", async (req, res, next) => {
  next(new NotFound("Path not found"));
});

app.use(errorHandler);

export { app };
