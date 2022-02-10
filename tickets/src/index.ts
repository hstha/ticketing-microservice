import mongoose from "mongoose";
import { isEnvPresent } from "@h-stha/utils";
import { app } from "./app";

const start = async () => {
  if (!isEnvPresent(["JWT_KEY", "DB_NAME", "DB_USERNAME", "DB_PORT"])) {
    throw new Error("All the envrioment must be defined");
  }

  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
    console.log("Ticket DB connected");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Ticket server is running");
  });
};

start();
