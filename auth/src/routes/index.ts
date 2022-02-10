import { Server } from "@h-stha/utils";
import { currentUser, validateRequest } from "@hstha-ticketing/common";
import { body } from "express-validator";
import { Auth } from "./Auth";

export class Router {
  private _server: Server;

  constructor() {
    this._server = Server.getInstance();
    this._server.createRoute();

    this.getCurrentUser();
    this.signin();
    this.signout();
    this.signup();
  }

  private getCurrentUser() {
    this._server.requestRoute(
      "/api/users/currentuser",
      "get",
      currentUser,
      (req, res, next) => {
        return res.status(200).json({ currentUser: req.currentUser || null });
      }
    );
  }

  private signup() {
    this._server.requestRoute(
      "/api/users/signup",
      "post",
      [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage("Password must be between 4 and 20 characters"),
      ],
      validateRequest,
      (req, res, next) => {
        const { email, password } = req.body;
        return Auth.signup({ email, password })
          .then((result) => {
            req.session = {
              jwt: result.jwtToken,
            };

            return res.status(201).json(result.user);
          })
          .catch((err) => next(err));
      }
    );
  }

  private signout() {
    this._server.requestRoute("/api/users/signout", "post", (req, res) => {
      req.session = Auth.signout();

      return res.status(200).json({});
    });
  }

  private signin() {
    this._server.requestRoute(
      "/api/users/signin",
      "post",
      [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
          .trim()
          .notEmpty()
          .withMessage("You must supply a password"),
      ],
      validateRequest,
      (req, res, next) => {
        const { email, password } = req.body;

        return Auth.signin({ email, password })
          .then((result) => {
            req.session = {
              jwt: result.jwtToken,
            };

            return res.status(200).json(result.user);
          })
          .catch((err) => next(err));
      }
    );
  }

  public getRouter() {
    return this._server.getRouter();
  }
}
