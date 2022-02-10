import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
// use as npm package
import { validateRequest } from "@hstha-ticketing/common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { ValidationError } from "@h-stha/utils";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      throw new ValidationError("Email in use", "bad-request-error");
    }

    const user = User.build({ email, password });

    try {
      await user.save();

      // generating jwt
      const jwtToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // storing jwt to token
      req.session = {
        jwt: jwtToken,
      };

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

export { router as signUp };
