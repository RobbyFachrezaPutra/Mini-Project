import { Request, Response, NextFunction } from "express";
import {
  CreateReviewService,
  GetReviewByTransactionId,
} from "../services/review.service";

async function CreateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await CreateReviewService(req.body);
    res
      .status(201)
      .json({ message: "Review berhasil ditambahkan", data: result });
  } catch (err) {
    next(err);
  }
}

async function GetReviewByTransactionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.transaction_id);
    const result = await GetReviewByTransactionId(id);
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

export { CreateReviewController, GetReviewByTransactionController };
