import { Request, Response, NextFunction } from "express";
import { GetOverviewService } from "../services/overview.service";

async function GetOverviewStatisticController(
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
    const data = await GetOverviewService(organizerId);
    res.status(200).json({
      message: "Overview statistic fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { GetOverviewStatisticController };
