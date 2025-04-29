import { Router } from "express";
import { CreateTicketController, GetAllTicketController, GetTicketController, UpdateTicketController, DeleteTicketController } from "../controllers/ticket.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { ticketSchema } from "../schemas/ticket.schema";
import {
  VerifyToken,
  requireAdminRole
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, requireAdminRole, ReqValidator(ticketSchema),  CreateTicketController);
router.get("/", VerifyToken, GetAllTicketController);
router.get("/:id", VerifyToken, GetTicketController);
router.put("/:id", VerifyToken, requireAdminRole, ReqValidator(ticketSchema),  UpdateTicketController);
router.delete("/:id", VerifyToken, requireAdminRole, DeleteTicketController);

export default router;
