import mongoose from "mongoose";
import { isEnvPresent } from "./services";
import { app } from "./app";

const start = async () => {
  if (!isEnvPresent(["JWT_KEY"])) {
    throw new Error("All the envrioment must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-clusterip-srv:27017/auth");
    console.log("DB connected");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Auth server is running");
  });
};

start();
