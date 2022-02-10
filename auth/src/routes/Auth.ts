import { Password, ValidationError } from "@h-stha/utils";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

interface IArgs {
  email: string;
  password: string;
}

export class Auth {
  static signup(args: IArgs) {
    const { email, password } = args;

    return User.findOne({ email })
      .then((user) => {
        if (user) {
          throw new ValidationError("Email in use", "bad-request-error");
        }

        const newUser = User.build({ email, password });

        return newUser
          .save()
          .then((result) => {
            const jwtToken = this.signToken(result.id, email);

            return { jwtToken, user: result };
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  static signin(args: IArgs) {
    const { email, password } = args;
    return User.findOne({ email })
      .then((user) => {
        if (!user) {
          throw new ValidationError("Invalid Credentials", "bad-request-error");
        }

        return Password.compare(user.password, password)
          .then((isMatched) => {
            if (!isMatched) {
              throw new ValidationError(
                "Invalid Credentials",
                "bad-request-error"
              );
            }

            const jwtToken = this.signToken(user.id, email);

            return { jwtToken, user };
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  static signout() {
    return null;
  }

  private static signToken(id: string, email: string) {
    return jwt.sign(
      {
        id,
        email,
      },
      process.env.JWT_KEY!
    );
  }
}
