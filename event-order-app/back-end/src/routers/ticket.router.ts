import { Router } from "express";
import { 
  CreateTicketController, 
  GetAllTicketController, 
  GetTicketController, 
  UpdateTicketController, 
  DeleteTicketController,
  GetTicketByEventIdController
} from "../controllers/ticket.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { ticketSchema } from "../schemas/ticket.schema";
import {
  VerifyToken,
  requireEventOrganizerRole
} from "../middlewares/auth.middleware";

const router = Router();

router.post("/", VerifyToken, requireEventOrganizerRole, ReqValidator(ticketSchema),  CreateTicketController);
router.get("/", VerifyToken, GetAllTicketController);
router.get("/by-event/:event_id", VerifyToken, GetTicketByEventIdController);
router.get("/:id", VerifyToken, GetTicketController);
router.put("/:id", VerifyToken, requireEventOrganizerRole, ReqValidator(ticketSchema),  UpdateTicketController);
router.delete("/:id", VerifyToken, requireEventOrganizerRole, DeleteTicketController);

export default router;
