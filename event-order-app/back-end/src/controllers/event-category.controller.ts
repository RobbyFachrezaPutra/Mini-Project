import { Request, Response, NextFunction } from "express";
import { CreateEventCategoryService, GetEventCategoryService, GetAllEventCategoryService, UpdateEventCategoryService } from "../services/event-category.service";
import { number } from "zod";

async function CreateEventCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CreateEventCategoryService(req.body);

    res.status(200).send({
      message: "Event category successfully saved ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetEventCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetEventCategoryService(Number(req.params.id));

    res.status(200).send({
      message: "Get Event category",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAllEventCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetAllEventCategoryService();

    res.status(200).send({
      message: "Get All Event category",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateEventCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UpdateEventCategoryService(Number(req.params.id), req.body);

    res.status(200).send({
      message: "Event category successfully updated ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { CreateEventCategoryController, GetEventCategoryController, GetAllEventCategoryController, UpdateEventCategoryController };
