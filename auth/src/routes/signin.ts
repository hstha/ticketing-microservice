import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequest } from "../errors";
import { validateRequest } from "../middleware";
import { User } from "../models/user";
import { Password } from "../services";

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequest("Invalid Credentials");
    }

    const passwordMatched = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatched) {
      throw new BadRequest("Invalid Credentials");
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
