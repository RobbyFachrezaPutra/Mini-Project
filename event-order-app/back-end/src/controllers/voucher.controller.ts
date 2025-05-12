import { Request, Response, NextFunction } from "express";
import { 
  CreateVoucherService, 
  GetVoucherService, 
  GetAllVoucherService, 
  UpdateVoucherService, 
  DeleteVoucherService,
  GetVoucherByEventIdService
} from "../services/voucher.service";

async function CreateVoucherController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CreateVoucherService(req.body);

    res.status(200).send({
      message: "Voucher successfully saved ",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetAllVoucherController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetAllVoucherService();

    res.status(200).send({
      message: "Get All Voucher",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetVoucherController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetVoucherService(Number(req.params.id));

    res.status(200).send({
      message: `Get Voucher with id ${req.params.id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function UpdateVoucherController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UpdateVoucherService(Number(req.params.id), req.body);

    res.status(200).send({
      message: "Voucher successfully updated",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function DeleteVoucherController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await DeleteVoucherService(Number(req.params.id));

    res.status(200).send({
      message: "Voucher successfully deleted",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetVoucherByEventIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await GetVoucherByEventIdService(Number(req.params.event_id));

    res.status(200).send({
      message: `Get Voucher with event id ${req.params.event_id}`,
      data,
    });
  } catch (err) {
    next(err);
  }
}

export { 
  CreateVoucherController, 
  GetVoucherController, 
  GetAllVoucherController, 
  UpdateVoucherController, 
  DeleteVoucherController,
  GetVoucherByEventIdController  
 };
