import express from "express";
import { json } from "body-parser";

import { currentUserRouter, signIn, signOut, signUp } from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { NotFound } from "./errors";

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signIn);
app.use(signOut);
app.use(signUp);

app.get("*", async (req, res, next) => {
  next(new NotFound("Path not found"));
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Auth server is running");
});
