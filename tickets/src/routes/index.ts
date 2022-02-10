import { Server } from "@h-stha/utils";
import { requireAuth, validateRequest } from "@hstha-ticketing/common";
import { body } from "express-validator";
import Ticket from "./ticket";

export class TicketRoutes {
  private server: Server;

  constructor() {
    this.server = Server.getInstance();
    this.server.createRoute();
    this.create();
    this.getAll();
    this.getById();
    this.updateById();
  }

  private create() {
    this.server.requestRoute(
      "/api/tickets",
      "post",
      requireAuth,
      [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("price")
          .isFloat({ gt: 0 })
          .withMessage("Price must be greater than 0"),
      ],
      validateRequest,
      (req, res, next) => {
        const { title, price } = req.body;

        return Ticket.create({
          currentUser: req.currentUser!,
          price,
          title,
        })
          .then((ticket) => res.status(201).send(ticket))
          .catch((err) => {
            next(err);
          });
      }
    );
  }

  private getAll() {
    return this.server.requestRoute("/api/tickets", "get", (req, res, next) => {
      Ticket.getAll()
        .then((tickets) => res.status(200).json(tickets))
        .catch((err) => {
          next(err);
        });
    });
  }

  private getById() {
    this.server.requestRoute("/api/tickets/:id", "get", (req, res, next) => {
      return Ticket.getById(req.params.id)
        .then((ticket) => {
          return res.status(200).json(ticket);
        })
        .catch((err) => {
          next(err);
        });
    });
  }

  private updateById() {
    this.server.requestRoute(
      "/api/tickets/:id",
      "put",
      requireAuth,
      [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("price")
          .isFloat({ gt: 0 })
          .withMessage("Price must be provided and must be greater than 0"),
      ],
      validateRequest,
      (req, res, next) => {
        const { title, price } = req.body;
        return Ticket.update({
          price,
          title,
          id: req.params.id,
          currentUser: req.currentUser!,
        })
          .then((ticket) => res.status(200).json(ticket))
          .catch((err) => {
            next(err);
          });
      }
    );
  }

  getRoute() {
    return this.server.getRouter();
  }
}
