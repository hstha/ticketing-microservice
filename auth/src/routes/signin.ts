import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "@hstha-ticketing/common";
import { User } from "../models/user";
import { Password, ValidationError } from "@h-stha/utils";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new ValidationError("Invalid Credentials", "bad-request-error");
    }

    const passwordMatched = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatched) {
      throw new ValidationError("Invalid Credentials", "bad-request-error");
    }

    // generating jwt
    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // storing jwt to token
    req.session = {
      jwt: jwtToken,
    };

    res.status(200).json(existingUser);
  }
);

export { router as signIn };
