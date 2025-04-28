import { Router } from "express";
import { CreateTicketController, GetAllTicketController, GetTicketController, UpdateTicketController, DeleteTicketController } from "../controllers/ticket.controller";
import ReqValidator from "../middlewares/validator.middleware";
import { ticketSchema } from "../schemas/ticket.schema";

const router = Router();

router.post("/", ReqValidator(ticketSchema),  CreateTicketController);
router.get("/", GetAllTicketController);
router.get("/:id", GetTicketController);
router.put("/:id", ReqValidator(ticketSchema),  UpdateTicketController);
router.delete("/:id", DeleteTicketController);

export default router;
