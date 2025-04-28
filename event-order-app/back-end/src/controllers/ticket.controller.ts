import { Request, Response, NextFunction } from "express";
import { CreateTicketService, GetTicketService, GetAllTicketService, UpdateTicketService, DeleteTicketService } from "../services/ticket.service";

async function CreateTicketController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CreateTicketService(req.body);

    res.status(200).send({
      message: "Ticket successfully saved ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAllTicketController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetAllTicketService();

    res.status(200).send({
      message: "Get All Ticket",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetTicketController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetTicketService(Number(req.params.id));

    res.status(200).send({
      message: `Get Ticket with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateTicketController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UpdateTicketService(Number(req.params.id), req.body);

    res.status(200).send({
      message: "Ticket successfully updated",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function DeleteTicketController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await DeleteTicketService(Number(req.params.id));

    res.status(200).send({
      message: "Ticket successfully deleted",
      data,
    });
  } catch (err) {
    next(err);
  }
}


export { CreateTicketController, GetTicketController, GetAllTicketController, UpdateTicketController, DeleteTicketController };
