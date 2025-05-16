import { Request, Response, NextFunction } from "express";

import {
  GetTicketsSoldByEventCategoryIdService,
  GetMonthlyRevenueService,
} from "../services/statistic.service";

async function GetTicketsSoldByEventCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Ambil organizerId dari user yang sudah login
    const organizerId = Number(req.params.organizerId);
    if (!organizerId) {
      res.status(400).json({ message: "Organizer ID is required" });
      return;
    }

    const data = await GetTicketsSoldByEventCategoryIdService(organizerId);
    res.status(200).send({
      message: "Get ticket by category successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetMonthlyRevenueController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizerId = Number(req.params.organizerId);
    if (!organizerId) {
      res.status(400).json({ message: "Organizer ID is required" });
      return;
    }

    const data = await GetMonthlyRevenueService(organizerId);

    res.status(200).send({
      message: "Monthly revenue data fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { GetMonthlyRevenueController, GetTicketsSoldByEventCategoryController };
