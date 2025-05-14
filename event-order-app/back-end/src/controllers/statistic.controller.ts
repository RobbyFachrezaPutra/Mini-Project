import { Request, Response, NextFunction } from "express";

import {
  GetTicketsSoldByCategoryService,
  GetMonthlyRevenueService,
} from "../services/statistic.service";

async function GetTicketsSoldByCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetTicketsSoldByCategoryService();
    res.status(200).send({
      message: "Get ticket by category successfully",
      data,
    }); // Kirim data sebagai response
  } catch (err) {
    next(err); // Lanjutkan ke error handler jika ada masalah
  }
}

async function GetMonthlyRevenueController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Panggil service untuk mendapatkan data revenue per bulan
    const data = await GetMonthlyRevenueService();

    // Kirimkan response sukses dengan data
    res.status(200).send({
      message: "Monthly revenue data fetched successfully",
      data,
    });
  } catch (err) {
    // Jika ada error, lanjutkan ke error handler
    next(err);
  }
}

export { GetMonthlyRevenueController, GetTicketsSoldByCategoryController };
