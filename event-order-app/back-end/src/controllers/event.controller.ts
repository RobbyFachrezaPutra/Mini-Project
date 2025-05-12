import { Request, Response, NextFunction } from "express";
import { 
  CreateEventService, 
  GetEventService, 
  GetAllEventService, 
  UpdateEventService, 
  DeleteEventService,
  SearchEventService
} from "../services/event.service";

async function CreateEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;
    const data = await CreateEventService(req.body, file);

    res.status(200).send({
      message: "Event successfully saved ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAllEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetAllEventService();

    res.status(200).send({
      message: "Get All Event",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function SearchEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const keyword = req.query.keyword as string || "";
    const data = await SearchEventService(keyword);

    res.status(200).send({
      message: "Get All Event",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetEventService(Number(req.params.id));

    res.status(200).send({
      message: `Get Event with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UpdateEventService(Number(req.params.id), req.body);

    res.status(200).send({
      message: "Event successfully updated ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function DeleteEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await DeleteEventService(Number(req.params.id));

    res.status(200).send({
      message: "Event successfully deleted ",
      data,
    });
  } catch (err) {
    next(err);
  }
}


export { 
  CreateEventController, 
  GetEventController, 
  GetAllEventController, 
  UpdateEventController, 
  DeleteEventController,
  SearchEventController 
};
