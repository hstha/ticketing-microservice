import { Ticket as TicketModel, TicketDoc } from "../models/ticket";
import { ValidationError } from "@h-stha/utils/build/server/errors";

interface ITicketArgs {
  title: string;
  price: number;
  currentUser: any;
  id?: string;
}

export default class Ticket {
  public static getAll() {
    return TicketModel.find({});
  }

  public static getById(id: string) {
    return TicketModel.findById(id)
      .then((ticket) => {
        if (!ticket) {
          throw new ValidationError("No Ticket Found", "not-found-error");
        }
        return ticket;
      })
      .catch((err) => {
        throw err;
      });
  }

  public static create(args: ITicketArgs): Promise<TicketDoc> {
    const ticket = TicketModel.build({
      title: args.title,
      price: args.price,
      userId: args.currentUser.id,
    });

    return ticket
      .save()
      .then(() => ticket)
      .catch((err) => {
        throw err;
      });
  }

  public static update(args: ITicketArgs) {
    return TicketModel.findById(args.id!)
      .then((ticket) => {
        if (!ticket) {
          throw new ValidationError("No Ticket Found", "not-found-error");
        }

        if (ticket.userId !== args.currentUser?.id) {
          throw new ValidationError(
            "Not Authorized Error",
            "not-authorized-error"
          );
        }

        ticket.set({
          title: args.title,
          price: args.price,
        });

        ticket
          .save()
          .then(() => ticket)
          .catch((err) => {
            throw new ValidationError(
              "Something went wrong",
              "internal-server-error"
            );
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}
