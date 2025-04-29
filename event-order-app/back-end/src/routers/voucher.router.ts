import { Router } from "express";
import { 
  CreateVoucherController, 
  GetAllVoucherController, 
  GetVoucherController, 
  UpdateVoucherController, 
  DeleteVoucherController 
} from "../controllers/voucher.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { voucherSchema } from "../schemas/voucher.schema";
import {
  VerifyToken,
  requireEventOrganizerRole
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, requireEventOrganizerRole, ReqValidator(voucherSchema),  CreateVoucherController);
router.get("/", VerifyToken, GetAllVoucherController);
router.get("/:id", VerifyToken, GetVoucherController);
router.put("/:id", VerifyToken, requireEventOrganizerRole, ReqValidator(voucherSchema),  UpdateVoucherController);
router.delete("/:id", VerifyToken, requireEventOrganizerRole, DeleteVoucherController);

export default router;
