import { Request, Response, NextFunction } from "express";
import {
  CreateEventService,
  GetEventService,
  GetAllEventService,
  UpdateEventService,
  DeleteEventService,
  SearchEventService,
  GetEventsByOrganizerService,
  getEventWithAttendees,
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
    const keyword = (req.query.keyword as string) || "";
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
    const file = req.file;
    const data = await UpdateEventService(Number(req.params.id), req.body, file);

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

async function GetEventsByOrganizerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizerId = Number(req.params.organizerId);

    if (isNaN(organizerId)) {
      res.status(400).json({ message: "Invalid organizerId" });
      return;
    }

    const data = await GetEventsByOrganizerService(organizerId);

    res.status(200).json({
      message: `Events for organizer ${organizerId} retrieved successfully`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAttendeesByEventController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventId = Number(req.params.eventId);

    if (isNaN(eventId) || eventId <= 0) {
      res.status(400).json({
        success: false,
        error: "Invalid event ID",
      });
      return;
    }

    const data = await getEventWithAttendees(eventId);

    res.status(200).json({
      success: true,
      message: `Attendees for event '${data.name}' retrieved successfully`,
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
  SearchEventController,
  GetEventsByOrganizerController,
  GetAttendeesByEventController,
};
