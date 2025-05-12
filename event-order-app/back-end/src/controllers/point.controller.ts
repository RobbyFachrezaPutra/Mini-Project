import { Request, Response, NextFunction } from "express";
import { GetPointByUserIdService } from "../services/point.service";

async function GetPointByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetPointByUserIdService(Number(req.params.user_id));

    res.status(200).send({
      message: `Get Points with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

export {GetPointByUserIdController}