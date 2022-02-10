import mongooes from "mongoose";
import { Password } from "@h-stha/utils";

// An interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User model has
interface UserModel extends mongooes.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User model has
interface UserDoc extends mongooes.Document {
  email: string;
  password: string;
}

// model at the user
const userSchema = new mongooes.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

// adding a middleware
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// adding custom properties
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

export const User = mongooes.model<UserDoc, UserModel>("User", userSchema);
