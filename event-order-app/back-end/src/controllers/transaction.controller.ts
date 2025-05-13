import { Request, Response, NextFunction } from "express";
import { 
  CreateTransactionService, 
  GetTransactionService, 
  GetAllTransactionService, 
  UpdateTransactionService, 
  UploadPaymentProofService,
  GetTransactionByUserIdService
} from "../services/transaction.service";

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

async function GetTransactionByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetTransactionByUserIdService(Number(req.params.user_id));

    res.status(200).send({
      message: `Get Transaction with user id ${req.params.user_id}`,
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

async function UploadPaymentProofController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;
    const data = await UploadPaymentProofService(req.body, Number(req.params.id), file);

    res.status(200).send({
      message: "Event successfully saved ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { 
  CreateTransactionController, 
  GetTransactionController, 
  GetAllTransactionController, 
  UpdateTransactionController, 
  UploadPaymentProofController, 
  GetTransactionByUserIdController 
};
