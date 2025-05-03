import { Request, Response, NextFunction } from "express";
import { CreateTransactionService, GetTransactionService, GetAllTransactionService, UpdateTransactionService } from "../services/transaction.service";

async function CreateTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CreateTransactionService(req.body);

    res.status(200).send({
      message: "Transaction successfully saved ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAllTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetAllTransactionService();

    res.status(200).send({
      message: "Get All Transaction",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetTransactionService(Number(req.params.id));

    res.status(200).send({
      message: `Get Transaction with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UpdateTransactionService(Number(req.params.id), req.body);

    res.status(200).send({
      message: "Transaction successfully updated ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { CreateTransactionController, GetTransactionController, GetAllTransactionController, UpdateTransactionController };
